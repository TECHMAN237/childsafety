/**
 * Light spacing refinements on existing classes (no structure changes).
 */
const fs = require('fs');
const path = require('path');
const screensDir = path.join(__dirname, 'screens');
const files = fs.readdirSync(screensDir).filter((f) => f.endsWith('.tsx'));

const replacements = [
  // Slightly more section breathing room on main hubs
  ['<main class="flex-grow pb-32">', '<main class="flex-grow pb-32 pt-1">'],
  ['<main class="max-w-7xl mx-auto px-container-margin pt-6 w-full">', '<main class="max-w-7xl mx-auto px-container-margin pt-8 w-full">'],
  ['<main class="px-container-margin py-lg space-y-lg">', '<main class="px-container-margin py-lg space-y-lg pb-28">'],
  // Card internal padding bump
  ['p-4 flex items-center gap-4 shadow-[0px_4px_20px', 'p-5 flex items-center gap-4 shadow-[0px_4px_20px'],
  ['p-5">\n<h3 class="font-headline-md', 'p-6">\n<h3 class="font-headline-md'],
  // Auth / form cards
  ['glass-card rounded-lg p-xl', 'glass-card rounded-xl p-xl'],
  ['rounded-lg p-xl shadow-[0px_4px_20px_rgba(108,77,255,0.06)] flex flex-col">', 'rounded-xl p-xl shadow-[0px_4px_20px_rgba(108,77,255,0.06)] flex flex-col gap-1">'],
];

let count = 0;
files.forEach((file) => {
  const fp = path.join(screensDir, file);
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;
  replacements.forEach(([from, to]) => {
    c = c.split(from).join(to);
  });
  if (c !== orig) {
    fs.writeFileSync(fp, c, 'utf8');
    count++;
  }
});
console.log(`Spacing refinements applied to ${count} files.`);
