const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'screens');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.tsx'));
const linkedTo = new Set(['splash_screen.tsx']);
let deadHash = 0;
let totalInteractive = 0;
let linkedInteractive = 0;

files.forEach((f) => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  deadHash += (c.match(/href=["']#["']/g) || []).length;
  const buttons = c.match(/<button[\s\S]*?<\/button>/gi) || [];
  buttons.forEach((btn) => {
    totalInteractive++;
    if (
      btn.includes('onclick') ||
      btn.includes('type="submit"') ||
      /toggle|visibility|filter_list|expand_more|selectMode|selectAccount/i.test(btn)
    ) {
      linkedInteractive++;
    }
  });
  [...c.matchAll(/href=["']\.\/([^"']+\.tsx)["']/gi)].forEach((m) => linkedTo.add(m[1]));
  [...c.matchAll(/window\.location\.href\s*=\s*['"]\.\/([^'"]+)['"]/g)].forEach((m) => linkedTo.add(m[1]));
  [...c.matchAll(/action=["']\.\/([^"']+)["']/gi)].forEach((m) => linkedTo.add(m[1]));
  if (c.includes('setTimeout') && c.includes('window.location.href')) linkedTo.add(f);
});

const orphans = files.filter((f) => !linkedTo.has(f));
const coverage = Math.round((linkedTo.size / files.length) * 100);
console.log({
  screens: files.length,
  deadHashLinks: deadHash,
  buttonsTotal: totalInteractive,
  buttonsLinked: linkedInteractive,
  screensReachable: linkedTo.size,
  orphans,
  navigationCoveragePercent: coverage,
});
