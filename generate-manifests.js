// generate-manifests.js
// Runs at Netlify build time to create manifest.json in each content folder
// so the frontend knows which .md files to fetch.

const fs = require('fs');
const path = require('path');

const dirs = [
  'content/projects',
  'content/publications',
  'content/awards'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(files, null, 2));
  console.log(`✅ manifest.json written for ${dir} (${files.length} files)`);
});
