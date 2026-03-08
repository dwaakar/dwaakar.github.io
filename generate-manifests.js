const fs = require('fs');
const path = require('path');

const dirs = [
  'content/projects',
  'content/publications',
  'content/awards',
  'content/education'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); return; }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(files, null, 2));
  console.log(`✅ manifest.json written for ${dir} (${files.length} files)`);
});
