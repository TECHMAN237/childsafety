/**
 * Injects shared UI polish stylesheet into all screen files.
 * Run: node apply_ui_polish.js
 */
const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'screens');
const linkTag = '<link rel="stylesheet" href="./ui-polish.css"/>';
const files = fs.readdirSync(screensDir).filter((f) => f.endsWith('.tsx'));

let updated = 0;

files.forEach((file) => {
  const filePath = path.join(screensDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('ui-polish.css')) {
    return;
  }

  // Insert after charset/viewport meta block or after first stylesheet link
  if (content.includes('<meta content="width=device-width')) {
    content = content.replace(
      /(<meta content="width=device-width[^>]*\/>)/,
      `$1\n${linkTag}`
    );
  } else if (content.includes('</head>')) {
    content = content.replace('</head>', `${linkTag}\n</head>`);
  } else {
    return;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updated++;
  console.log('✓', file);
});

console.log(`\nUI polish linked in ${updated} screens.`);
