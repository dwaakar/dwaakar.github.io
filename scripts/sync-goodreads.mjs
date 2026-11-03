// Fetches your Goodreads shelves (RSS) and writes data/books.json.
// The feed URL (it contains a private key) comes from the GOODREADS_RSS_URL repo secret.
import fs from 'node:fs';
import { XMLParser } from 'fast-xml-parser';
import sharp from 'sharp';

const BASE = (process.env.GOODREADS_RSS_URL || '').trim();
const OUT = 'data/books.json';
if (!BASE) { console.log('GOODREADS_RSS_URL is not set. Nothing to do.'); process.exit(0); }

const parser = new XMLParser({ ignoreAttributes: true, trimValues: true });
const txt = v => (v == null ? '' : String(v)).trim();
const SYSTEM = new Set(['read', 'currently-reading', 'to-read']);
const old = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { books: [] };
const oldColor = new Map((old.books || []).map(b => [b.id, b.color]));

async function page(n) {
  const u = new URL(BASE);
  u.searchParams.set('shelf', '#ALL#');
  u.searchParams.set('per_page', '200');
  u.searchParams.set('page', String(n));
  const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0 (portfolio library sync)' } });
  if (!r.ok) throw new Error('Goodreads answered ' + r.status);
  const items = parser.parse(await r.text())?.rss?.channel?.item;
  return Array.isArray(items) ? items : items ? [items] : [];
}

async function colorOf(url) {
  try {
    const r = await fetch(url); if (!r.ok) return null;
    const { data } = await sharp(Buffer.from(await r.arrayBuffer())).resize(24, 24, { fit: 'cover' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    let R = 0, G = 0, B = 0, W = 0;
    for (let i = 0; i < data.length; i += 3) {
      const w = Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]) + 10; // favour vivid pixels
      R += data[i] * w; G += data[i + 1] * w; B += data[i + 2] * w; W += w;
    }
    return '#' + [R, G, B].map(v => Math.round(v / W).toString(16).padStart(2, '0')).join('');
  } catch { return null; }
}

const pretty = s => s.replace(/[-_]+/g, ' ').replace(/^./, c => c.toUpperCase());
try {
  const seen = new Map();
  for (let n = 1; n <= 10; n++) {
    const items = await page(n);
    const before = seen.size;
    items.forEach(i => seen.set(txt(i.book_id) || txt(i.guid), i));
    if (!items.length || seen.size === before) break;
  }
  const books = [];
  for (const [id, i] of seen) {
    const shelves = txt(i.user_shelves).split(',').map(s => s.trim()).filter(Boolean);
    const readAt = txt(i.user_read_at);
    const tbr = shelves.includes('to-read') && !readAt;               // want-to-read
    let cover = txt(i.book_large_image_url) || txt(i.book_image_url);
    if (cover.includes('nophoto')) cover = '';
    const custom = shelves.find(s => !SYSTEM.has(s));
    books.push({
      id, title: txt(i.title), author: txt(i.author_name), cover,
      color: oldColor.get(id) || (cover ? await colorOf(cover) : null),
      rating: Number(txt(i.user_rating)) || 0,
      avg: Number(txt(i.average_rating)) || 0,
      genre: custom ? pretty(custom) : '', shelves: shelves.filter(s => !SYSTEM.has(s)).map(pretty),
      reading: shelves.includes('currently-reading'), tbr, dateRead: readAt,
      link: txt(i.link).split('?')[0],
    });
  }
  if (!books.length) { console.log('Feed returned no books; keeping the existing file.'); process.exit(0); }
  if (JSON.stringify(books) === JSON.stringify(old.books)) { console.log('No changes.'); process.exit(0); }
  fs.mkdirSync('data', { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ updated: new Date().toISOString(), books }, null, 1));
  console.log('Wrote', books.length, 'books');
} catch (e) {
  console.log('Sync failed, keeping the existing file:', e.message); // never break the site
}
