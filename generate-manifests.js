const fs = require('fs');
const path = require('path');

const dirs = [
  'content/projects',
  'content/publications',
  'content/awards',
  'content/education',
  'content/experience'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); return; }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(files, null, 2));
  console.log(`✅ manifest.json written for ${dir} (${files.length} files)`);
});

// Custom sections — generate manifest for each subfolder
const customBase = 'content/custom';
if (fs.existsSync(customBase)) {
  fs.readdirSync(customBase).forEach(sub => {
    const subDir = path.join(customBase, sub);
    if (fs.statSync(subDir).isDirectory()) {
      const files = fs.readdirSync(subDir).filter(f => f.endsWith('.md'));
      fs.writeFileSync(path.join(subDir, 'manifest.json'), JSON.stringify(files, null, 2));
      console.log(`✅ manifest.json written for ${subDir} (${files.length} files)`);
    }
  });
}

// Also read sections.json and pre-create folders
const sectionsFile = 'content/sections.json';
if (fs.existsSync(sectionsFile)) {
  try {
    const sections = JSON.parse(fs.readFileSync(sectionsFile, 'utf8'));
    sections.forEach(sec => {
      const dir = path.join(customBase, sec.id);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'manifest.json'), '[]');
        console.log(`✅ Created folder for custom section: ${sec.id}`);
      }
    });
  } catch(e) {
    console.log('Could not parse sections.json:', e.message);
  }
}
