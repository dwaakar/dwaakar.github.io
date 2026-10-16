#!/usr/bin/env node
/**
 * Zero-Dependency Static Content Bundler & Hybrid Auto-Sync Engine
 * for diwakaradhikari.info.np (GitHub + Cloudflare Pages + Decap CMS)
 *
 * Cloudflare Pages Setup:
 *   Build command: node build.js
 *   Build output directory: /
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CONTENT_DIR = path.join(ROOT, 'content');

const MONTH_NAMES = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function parseMonthNum(m) {
  if (m == null || m === '') return 0;
  const n = Number(m);
  if (!Number.isNaN(n) && n >= 1 && n <= 12) return Math.floor(n);
  const s = String(m).trim().toLowerCase();
  const idx = MONTH_NAMES.findIndex(name => name && name.toLowerCase().startsWith(s.slice(0, 3)));
  return idx > 0 ? idx : 0;
}

function extractStartYear(item) {
  const str = String(item.year || item.date || item.startDate || '');
  const m = str.match(/\b(19|20)\d{2}\b/);
  return m ? Number(m[0]) : 9999;
}

function readJsonSafe(filePath, fallback = null) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.warn('[build.js] Could not parse JSON:', filePath, err.message);
    return fallback;
  }
}

function parseFrontMatter(text) {
  const normalized = text.replace(/\r\n/g, '\n');
  const m = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { data: {}, content: normalized.trim() };
  const data = {};
  const lines = m[1].split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.startsWith('#')) { i++; continue; }
    const ci = line.indexOf(':');
    if (ci === -1) { i++; continue; }
    const key = line.slice(0, ci).trim();
    let val = line.slice(ci + 1).trim();
    i++;

    if (['>', '>-', '>+', '|', '|-', '|+'].includes(val)) {
      const isLiteral = val.startsWith('|');
      const parts = [];
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i] === '')) {
        parts.push(lines[i].startsWith('  ') ? lines[i].slice(2) : '');
        i++;
      }
      if (isLiteral) {
        data[key] = parts.join('\n').trimEnd();
      } else {
        const paras = [];
        let cur = [];
        parts.forEach(l => {
          if (l === '') { if (cur.length) { paras.push(cur.join(' ')); cur = []; } }
          else cur.push(l);
        });
        if (cur.length) paras.push(cur.join(' '));
        data[key] = paras.join('\n\n').trim();
      }
      continue;
    }

    if (val === '' || val === '[]') {
      const items = [];
      while (i < lines.length && /^  /.test(lines[i])) {
        const itemLine = lines[i];
        if (/^  - /.test(itemLine)) {
          const itemVal = itemLine.slice(4).trim();
          if (itemVal.includes(':')) {
            const obj = {};
            const ici = itemVal.indexOf(':');
            obj[itemVal.slice(0, ici).trim()] = itemVal.slice(ici + 1).trim().replace(/^["']|["']$/g, '');
            i++;
            while (i < lines.length && /^    \S/.test(lines[i])) {
              const cl = lines[i].trim();
              const cci = cl.indexOf(':');
              if (cci !== -1) obj[cl.slice(0, cci).trim()] = cl.slice(cci + 1).trim().replace(/^["']|["']$/g, '');
              i++;
            }
            items.push(obj);
          } else {
            items.push(itemVal.replace(/^["']|["']$/g, ''));
            i++;
          }
        } else {
          i++;
        }
      }
      data[key] = items;
    } else if (val.startsWith('[')) {
      try { data[key] = JSON.parse(val); }
      catch (e) { data[key] = val.replace(/[\[\]"]/g, '').split(',').map(s => s.trim()).filter(Boolean); }
    } else if (val === 'true' || val === 'false') {
      data[key] = val === 'true';
    } else {
      data[key] = val.replace(/^["']|["']$/g, '');
    }
  }
  return { data, content: normalized.slice(m[0].length).trim() };
}

function loadMarkdownCollection(folderName) {
  const dir = path.join(CONTENT_DIR, folderName);
  if (!fs.existsSync(dir)) return [];
  const mdFiles = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();

  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(mdFiles, null, 2));

  return mdFiles.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data, content } = parseFrontMatter(raw);
    return {
      ...data,
      body: data.body || content || '',
      detail: content || data.body || '',
      slug: file.replace(/\.md$/, '')
    };
  }).sort((a, b) => (+a.order || 99) - (+b.order || 99));
}

function buildBundle() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('[build.js] No content/ directory found yet; skipping bundle generation.');
    return;
  }

  const settings = readJsonSafe(path.join(CONTENT_DIR, 'settings.json'), {});
  const skills = readJsonSafe(path.join(CONTENT_DIR, 'skills.json'), { items: [] });
  const mapData = readJsonSafe(path.join(CONTENT_DIR, 'map.json'), { districts: [] });
  const customSections = readJsonSafe(path.join(CONTENT_DIR, 'sections.json'), []);

  const education = loadMarkdownCollection('education');
  const projects = loadMarkdownCollection('projects');
  const publications = loadMarkdownCollection('publications');
  const experience = loadMarkdownCollection('experience');

  let customItems = [];
  if (Array.isArray(customSections)) {
    customSections.forEach(sec => {
      if (!sec || !sec.id) return;
      const items = loadMarkdownCollection(path.join('custom', sec.id));
      customItems = customItems.concat(items.map(it => ({ ...it, sectionId: sec.id })));
    });
  }

  // Hybrid Auto-Sync 1: Merge CMS milestones + auto-pinned Projects/Education/Experience
  const baseMilestones = Array.isArray(settings.milestones) ? [...settings.milestones] : [];
  const seenTitles = new Set(baseMilestones.map(m => (m.title || '').toLowerCase().trim()));

  function collectCandidate(item, defaultIcon) {
    const shouldShow = item.showOnJourney === true || item.showOnJourney === 'true';
    if (!shouldShow) return;
    const key = (item.title || '').toLowerCase().trim();
    if (!key || seenTitles.has(key)) return;
    seenTitles.add(key);
    baseMilestones.push({
      year: item.year || item.startDate || '',
      month: item.month || '',
      date: item.date || '',
      elevation: (item.elevation !== undefined && item.elevation !== '') ? Number(item.elevation) : null,
      title: item.title,
      sub: item.organisation || item.institution || '',
      description: (item.shortDesc || item.detail || '').replace(/[#*_`>-]/g, '').slice(0, 220),
      icon: item.journeyIcon || defaultIcon
    });
  }

  education.forEach(e => collectCandidate(e, '🎓'));
  experience.forEach(x => collectCandidate(x, '💼'));
  projects.forEach(p => collectCandidate(p, p.category === 'community' ? '🤝' : '🔬'));

  // Count how many milestones share the exact same year string
  const yearCounts = {};
  baseMilestones.forEach(m => {
    const yKey = String(m.year || '').trim();
    if (yKey) yearCounts[yKey] = (yearCounts[yKey] || 0) + 1;
  });

  // Sort milestones chronologically Upstream (earliest year & month) -> Downstream (latest year & month)
  baseMilestones.forEach((m, idx) => {
    m._origIdx = idx;
    m._yearNum = extractStartYear(m);
    m._monthNum = parseMonthNum(m.month);
    const yKey = String(m.year || '').trim();
    // Only show month automatically if multiple milestones share the same year!
    if (!m.date || m.date === m.year) {
      if (yearCounts[yKey] > 1 && m._monthNum >= 1 && m._monthNum <= 12) {
        m.date = `${MONTH_NAMES[m._monthNum]} ${yKey}`;
      } else {
        m.date = yKey;
      }
    }
  });

  baseMilestones.sort((a, b) => {
    if (a._yearNum !== b._yearNum) return a._yearNum - b._yearNum;
    if (a._monthNum !== b._monthNum) return a._monthNum - b._monthNum;
    return a._origIdx - b._origIdx;
  });

  // Assign smooth upstream (6000m) -> downstream (250m) positions so same-year items never overlap
  const totalM = baseMilestones.length;
  baseMilestones.forEach((m, idx) => {
    delete m._origIdx;
    delete m._yearNum;
    delete m._monthNum;
    if (m.elevation == null || m.elevation === '' || Number.isNaN(Number(m.elevation))) {
      const t = totalM > 1 ? idx / (totalM - 1) : 0;
      m.elevation = Math.round(6000 - t * (6000 - 250));
    }
  });

  settings.milestones = baseMilestones;

  // Hybrid Auto-Sync 2: Merge Linked Districts into Map Data
  const baseDistricts = Array.isArray(mapData.districts) ? [...mapData.districts] : [];
  const byDistrict = new Map();
  baseDistricts.forEach(d => {
    if (d && d.name) byDistrict.set(d.name.toUpperCase().trim(), d);
  });

  function syncItemDistricts(item, defaultType) {
    const list = Array.isArray(item.districts) ? item.districts : [];
    list.forEach(rawName => {
      const name = String(typeof rawName === 'object' ? rawName.district || rawName.name : rawName).toUpperCase().trim();
      if (!name || byDistrict.has(name)) return;
      const entry = {
        name,
        type: item.category === 'community' ? 'community' : defaultType,
        project: item.title,
        year: item.year || item.startDate || '',
        note: (item.shortDesc || '').replace(/[#*_`>-]/g, '').slice(0, 140)
      };
      baseDistricts.push(entry);
      byDistrict.set(name, entry);
    });
  }

  projects.forEach(p => syncItemDistricts(p, 'research'));
  experience.forEach(x => syncItemDistricts(x, 'research'));
  mapData.districts = baseDistricts;

  const bundle = {
    generatedAt: new Date().toISOString(),
    settings,
    skills,
    mapData,
    education,
    projects,
    publications,
    experience,
    customSections,
    customItems
  };

  const outPath = path.join(CONTENT_DIR, 'bundle.json');
  fs.writeFileSync(outPath, JSON.stringify(bundle, null, 2));
  console.log(`[build.js] Built ${outPath} (${projects.length} projects, ${publications.length} pubs, ${settings.milestones.length} journey stations).`);
}

buildBundle();
