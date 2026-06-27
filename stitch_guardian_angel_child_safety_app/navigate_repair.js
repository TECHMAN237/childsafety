/**
 * Comprehensive navigation repair for Child Safety static screens.
 * Run: node navigate_repair.js
 */
const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'screens');
const files = fs.readdirSync(screensDir).filter((f) => f.endsWith('.tsx'));

function read(file) {
  return fs.readFileSync(path.join(screensDir, file), 'utf8');
}
function write(file, content) {
  fs.writeFileSync(path.join(screensDir, file), content, 'utf8');
}

function addOnclickToButton(html, matchText, href) {
  const re = new RegExp(
    `(<button[^>]*>)([\\s\\S]*?${matchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?</button>)`,
    'i'
  );
  return html.replace(re, (full, open, rest) => {
    if (open.includes('onclick=')) return full;
    return open.replace('<button', `<button onclick="window.location.href='${href}'"`) + rest;
  });
}

function fixBottomNav(html) {
  // Standardize bottom nav hrefs when using <a> tags
  html = html.replace(
    /(<a[^>]*href="\.\/)[^"]+("[^>]*>[\s\S]*?<span[^>]*>home<\/span>)/gi,
    '$1home_child_safety_v1.tsx$2'
  );
  html = html.replace(
    /(<a[^>]*href="\.\/)[^"]+("[^>]*>[\s\S]*?<span[^>]*>Reports<\/span>)/gi,
    '$1reports_directory.tsx$2'
  );
  html = html.replace(
    /(<a[^>]*href="\.\/)[^"]+("[^>]*>[\s\S]*?<span[^>]*>Alerts<\/span>)/gi,
    '$1alert_center.tsx$2'
  );
  return html;
}

function convertProfileBottomNavButtons(html) {
  const replacements = [
    [/(<button[^>]*>[\s\S]*?<span[^>]*>home<\/span>[\s\S]*?<\/button>)/i, `<a class="flex flex-col items-center justify-center text-on-secondary-fixed-variant dark:text-secondary-fixed-dim px-4 py-2 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors active:scale-90 transition-transform duration-200" href="./home_child_safety_v1.tsx">
<span class="material-symbols-outlined">home</span>
<span class="font-label-sm text-label-sm">Home</span>
</a>`],
    [/(<button[^>]*>[\s\S]*?<span[^>]*>Reports<\/span>[\s\S]*?<\/button>)/i, `<a class="flex flex-col items-center justify-center text-on-secondary-fixed-variant dark:text-secondary-fixed-dim px-4 py-2 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors active:scale-90 transition-transform duration-200" href="./reports_directory.tsx">
<span class="material-symbols-outlined">description</span>
<span class="font-label-sm text-label-sm">Reports</span>
</a>`],
    [/(<button[^>]*>[\s\S]*?<span[^>]*>Alerts<\/span>[\s\S]*?<\/button>)/i, `<a class="flex flex-col items-center justify-center text-on-secondary-fixed-variant dark:text-secondary-fixed-dim px-4 py-2 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors active:scale-90 transition-transform duration-200" href="./alert_center.tsx">
<span class="material-symbols-outlined">notifications</span>
<span class="font-label-sm text-label-sm">Alerts</span>
</a>`],
  ];
  for (const [re, repl] of replacements) {
    html = html.replace(re, repl);
  }
  return html;
}

let updated = 0;

for (const file of files) {
  let c = read(file);
  const orig = c;

  // --- AUTH FLOW ---
  if (file === 'splash_screen.tsx') {
    c = c.replace(
      "window.location.href = './account_type_selection_updated_flow.tsx'",
      "window.location.href = './login_child_safety.tsx'"
    );
  }

  if (file === 'sign_up_child_safety.tsx') {
    c = c.replace('action="./success_account_created.tsx"', 'action="./account_type_selection_updated_flow.tsx"');
    c = c.replace(/href="\.\/home_child_safety_v1\.tsx">Terms/g, 'href="./privacy_settings.tsx">Terms');
    c = c.replace(/href="\.\/home_child_safety_v1\.tsx">Privacy Policy/g, 'href="./privacy_settings.tsx">Privacy Policy');
  }

  if (file === 'account_type_selection_updated_flow.tsx') {
    c = c.replace(
      `onclick="window.location.href='./sign_up_child_safety.tsx'"`,
      `onclick="window.location.href='./basic_information.tsx'"`
    );
    // Store role for home screen (community cannot report missing)
    if (!c.includes('sessionStorage.setItem')) {
      c = c.replace(
        'element.classList.add(\'active-selection\');',
        `element.classList.add('active-selection');
            const role = element.querySelector('h3')?.innerText?.trim() || '';
            sessionStorage.setItem('childSafetyAccountType', role);`
      );
    }
  }

  if (file === 'success_account_created.tsx') {
    c = c.replace(/\.\/basic_information\.tsx/g, './home_child_safety_v1.tsx');
    // Keep one path to complete profile if user skipped
    c = c.replace(
      `<button class="w-full h-[56px] bg-white border border-primary text-primary rounded-full font-headline-md flex items-center justify-center gap-sm hover:bg-primary/5 active:scale-[0.98] transition-all" onclick="window.location.href='./home_child_safety_v1.tsx'">`,
      `<button class="w-full h-[56px] bg-white border border-primary text-primary rounded-full font-headline-md flex items-center justify-center gap-sm hover:bg-primary/5 active:scale-[0.98] transition-all" onclick="window.location.href='./basic_information.tsx'">`
    );
  }

  if (file === 'login_child_safety.tsx') {
    if (!c.includes('Continue as Guest')) {
      c = c.replace(
        `<div class="mt-lg text-center">`,
        `<div class="mt-md text-center">
<p class="font-body-md text-on-surface-variant">
            <a class="text-primary font-label-bold text-label-bold hover:underline" href="./home_child_safety_v1.tsx">Continue as Guest</a>
</p>
</div>
<div class="mt-lg text-center">`
      );
    }
  }

  if (file === 'onboarding_community_protection_step_1.tsx') {
    c = addOnclickToButton(c, 'Next', './onboarding_reporter.tsx');
  }

  if (file === 'onboarding_reporter.tsx') {
    c = addOnclickToButton(c, 'Next', './onboarding_alerte.tsx');
  }

  if (file === 'onboarding_alerte.tsx') {
    c = addOnclickToButton(c, 'Get Started', './success_account_created.tsx');
    c = c.replace(
      `document.querySelector('button').addEventListener('click', function() {
            this.classList.add('scale-95');
            setTimeout(() => this.classList.remove('scale-95'), 150);
        });`,
      `document.querySelectorAll('footer button').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.textContent.includes('Get Started')) {
                    window.location.href = './success_account_created.tsx';
                    return;
                }
                this.classList.add('scale-95');
                setTimeout(() => this.classList.remove('scale-95'), 150);
            });
        });`
    );
  }

  if (file === 'safety_community_preferences.tsx') {
    c = addOnclickToButton(c, 'Previous', "javascript:history.back()");
    c = addOnclickToButton(c, 'Create Account', './basic_information.tsx');
    c = c.replace(/href="\.\/home_child_safety_v1\.tsx">Child Safety Terms/g, 'href="./privacy_settings.tsx">Child Safety Terms');
    c = c.replace(/href="\.\/home_child_safety_v1\.tsx">Privacy Policy/g, 'href="./privacy_settings.tsx">Privacy Policy');
  }

  // --- FOUND CHILD FLOW ---
  if (file === 'signaler_un_enfant_trouv_d_tails_de_la_d_couverte.tsx') {
    c = addOnclickToButton(c, 'Suivant', './v_rifier_le_signalement_tape_2_evidence.tsx');
    // Remove misleading bottom nav during wizard — replace with continue-only bar comment kept, fix nav links
    c = fixBottomNav(c);
  }

  if (file === 'v_rifier_le_signalement_tape_2_evidence.tsx') {
    c = addOnclickToButton(c, 'Précédent', './signaler_un_enfant_trouv_d_tails_de_la_d_couverte.tsx');
    c = addOnclickToButton(c, 'Soumettre le signalement', './report_under_review_missing_child.tsx');
  }

  // --- MISSING CHILD alt entry ---
  if (file === 'create_missing_report.tsx') {
    c = addOnclickToButton(c, 'Suivant', './v_rifier_le_lien_de_parent.tsx');
  }

  // --- HOME ---
  if (file === 'home_child_safety_v1.tsx') {
    c = c.replace(/href="\.\/alert_center\.tsx"([^>]*>[\s\S]*?<span[^>]*>home<\/span>)/gi, 'href="./home_child_safety_v1.tsx"$1');
    c = c.replace(/href="\.\/alert_center\.tsx"([^>]*>[\s\S]*?<span[^>]*>Reports<\/span>)/gi, 'href="./reports_directory.tsx"$1');
    c = c.replace(/href="\.\/alert_center\.tsx"([^>]*>[\s\S]*?<span[^>]*>Profile<\/span>)/gi, 'href="./guardian_profile_updated_my_reports.tsx"$1');
    c = addOnclickToButton(c, 'Report Missing', './signaler_un_disparu_tape_1.tsx');
    c = addOnclickToButton(c, 'Report Found', './signaler_un_enfant_trouv_tape_1.tsx');
    c = addOnclickToButton(c, 'Browse Reports', './reports_directory.tsx');
    c = addOnclickToButton(c, 'View Details', './report_details.tsx');
    c = addOnclickToButton(c, 'View All', './reports_directory.tsx');
    c = c.replace(
      '<button class="text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 p-2 rounded-full">\n<span class="material-symbols-outlined">notifications</span>',
      '<button class="text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 p-2 rounded-full" onclick="window.location.href=\'./alert_center.tsx\'">\n<span class="material-symbols-outlined">notifications</span>'
    );
    c = c.replace(
      '<button aria-label="Smart Radar" class="fixed right-6 bottom-24',
      '<button aria-label="Smart Radar" onclick="window.location.href=\'./v2_smart_device_preview.tsx\'" class="fixed right-6 bottom-24'
    );
    c = c.replace(
      '<a class="flex flex-col items-center justify-center text-on-secondary-container px-4 py-1.5 hover:bg-surface-container-high rounded-xl transition-all" href="./alert_center.tsx">\n<span class="material-symbols-outlined">assignment</span>',
      '<a class="flex flex-col items-center justify-center text-on-secondary-container px-4 py-1.5 hover:bg-surface-container-high rounded-xl transition-all" href="./reports_directory.tsx">\n<span class="material-symbols-outlined">assignment</span>'
    );
    if (!c.includes('childSafetyAccountType')) {
      c = c.replace(
        '</script>\n</body>',
        `        // Hide Report Missing for Community Member / Volunteer (cannot report missing)
        (function() {
            const role = sessionStorage.getItem('childSafetyAccountType') || '';
            const restricted = /Community Member|Volunteer Helper/i.test(role);
            if (restricted) {
                document.querySelectorAll('button').forEach(btn => {
                    if (btn.textContent.includes('Report Missing')) {
                        btn.style.display = 'none';
                    }
                });
            }
        })();
    </script>
</body>`
      );
    }
  }

  // --- REPORTS DIRECTORY ---
  if (file === 'reports_directory.tsx') {
    c = c.replace(/href="\.\/report_details\.tsx">Home/g, 'href="./home_child_safety_v1.tsx">Home');
    c = c.replace(/href="\.\/report_details\.tsx">Reports/g, 'href="./reports_directory.tsx">Reports');
    c = c.replace(/href="\.\/report_details\.tsx">Alerts/g, 'href="./alert_center.tsx">Alerts');
    c = c.replace(/href="\.\/report_details\.tsx">Profile/g, 'href="./guardian_profile_updated_my_reports.tsx">Profile');
    c = c.replace(
      'href="./report_details.tsx">\n<span class="material-symbols-outlined mb-1" data-icon="assignment"',
      'href="./reports_directory.tsx">\n<span class="material-symbols-outlined mb-1" data-icon="assignment"'
    );
    c = c.replace(
      'href="./report_details.tsx">\n<span class="material-symbols-outlined mb-1" data-icon="notifications_active"',
      'href="./alert_center.tsx">\n<span class="material-symbols-outlined mb-1" data-icon="notifications_active"'
    );
    // Clickable report cards
    c = c.replace(
      /(<div class="bg-surface-container-lowest rounded-\[32px\][^"]*cursor-pointer)/g,
      '$1" onclick="window.location.href=\'./report_details.tsx\'"'
    );
    c = c.replace('cursor-pointer" onclick', 'cursor-pointer onclick'); // fix double
    c = addOnclickToButton(
      c,
      'add',
      './signaler_un_disparu_tape_1.tsx'
    );
    c = c.replace(
      '<button class="text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 p-2 rounded-full">\n<span class="material-symbols-outlined" data-icon="notifications"',
      '<button class="text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 p-2 rounded-full" onclick="window.location.href=\'./alert_center.tsx\'">\n<span class="material-symbols-outlined" data-icon="notifications"'
    );
  }

  // --- ALERT CENTER ---
  if (file === 'alert_center.tsx') {
    c = c.replace(/onclick="[^"]*" onclick="[^"]*" onclick="[^"]*"/, 'onclick="window.location.href=\'./alert_center.tsx\'"');
    c = addOnclickToButton(c, 'View Details', './report_details.tsx');
    c = addOnclickToButton(c, 'Review Match', './ai_smart_matching.tsx');
    c = addOnclickToButton(c, 'View Report', './report_details.tsx');
    c = addOnclickToButton(c, 'Help Nearby', './report_details.tsx');
    c = addOnclickToButton(c, 'add_alert', './signaler_un_enfant_trouv_tape_1.tsx');
    // V2 filter chip
    c = c.replace(
      '<button class="px-lg py-sm rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high whitespace-nowrap">V2</button>',
      '<button class="px-lg py-sm rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high whitespace-nowrap" onclick="window.location.href=\'./smart_alerts_guardian_flow.tsx\'">V2</button>'
    );
    c = fixBottomNav(c);
  }

  // --- PROFILE ---
  if (file === 'guardian_profile_updated_my_reports.tsx') {
    c = convertProfileBottomNavButtons(c);
    c = addOnclickToButton(c, 'View My Reports', './my_case_dashboard_refined_actions.tsx');
    c = addOnclickToButton(c, 'Learn More', './v2_smart_device_preview.tsx');
    c = c.replace(
      '<button class="material-symbols-outlined text-primary dark:text-primary-fixed hover:opacity-80 transition-opacity active:scale-95 duration-200">notifications</button>',
      '<button class="material-symbols-outlined text-primary dark:text-primary-fixed hover:opacity-80 transition-opacity active:scale-95 duration-200" onclick="window.location.href=\'./alert_center.tsx\'">notifications</button>'
    );
    const settingsMap = [
      ['Notifications', './notifications_settings.tsx'],
      ['Privacy', './privacy_settings.tsx'],
      ['Emergency Preferences', './emergency_preferences.tsx'],
      ['Help Center', './help_center.tsx'],
      ['About', './about_safeguardian.tsx'],
      ['Logout', './login_child_safety.tsx'],
    ];
    for (const [label, href] of settingsMap) {
      c = c.replace(
        new RegExp(
          `(<button class="w-full flex items-center justify-between p-lg[^"]*"[^>]*>[\\s\\S]*?<span class="font-body-lg[^"]*">${label}</span>)`,
          'i'
        ),
        `$1`.replace('<button', `<button onclick="window.location.href='${href}'"`)
      );
      // Simpler: add onclick before closing first settings button with label
      const re = new RegExp(
        `(<button class="w-full flex items-center justify-between p-lg hover:bg-surface-container-low transition-colors group">\\s*<div class="flex items-center gap-md">[\\s\\S]*?<span class="font-body-lg text-body-lg text-on-surface">${label}</span>)`
      );
      if (re.test(c) && !c.includes(`>${label}</span>\n</div>\n<span class="material-symbols-outlined text-outline">chevron_right</span>\n</button>`.replace(label, label))) {
        c = c.replace(re, `<button onclick="window.location.href='${href}'" class="w-full flex items-center justify-between p-lg hover:bg-surface-container-low transition-colors group">\n<div class="flex items-center gap-md">\n<span class="font-body-lg text-body-lg text-on-surface">${label}</span>`);
      }
    }
    // Manual settings onclick injection
    const settings = [
      ['>Notifications<', './notifications_settings.tsx'],
      ['>Privacy<', './privacy_settings.tsx'],
      ['>Emergency Preferences<', './emergency_preferences.tsx'],
      ['>Help Center<', './help_center.tsx'],
      ['>About<', './about_safeguardian.tsx'],
      ['>Logout<', './login_child_safety.tsx'],
    ];
    for (const [needle, href] of settings) {
      const idx = c.indexOf(needle);
      if (idx === -1) continue;
      const btnStart = c.lastIndexOf('<button', idx);
      if (btnStart === -1) continue;
      const btnTag = c.substring(btnStart, c.indexOf('>', btnStart) + 1);
      if (btnTag.includes('onclick')) continue;
      c = c.substring(0, btnStart) + btnTag.replace('<button', `<button onclick="window.location.href='${href}'"`) + c.substring(c.indexOf('>', btnStart) + 1);
    }
  }

  // --- ABOUT / HELP / NOTIFICATIONS bottom nav ---
  if (['about_safeguardian.tsx', 'help_center.tsx', 'notifications_settings.tsx', 'privacy_settings.tsx', 'emergency_preferences.tsx'].includes(file)) {
    c = fixBottomNav(c);
  }

  if (file === 'about_safeguardian.tsx') {
    c = c.replace(/href="\.\/home_child_safety_v1\.tsx">\s*<div class="flex items-center gap-lg">\s*<div class="w-12 h-12 rounded-full bg-primary-fixed[^"]*">\s*<span class="material-symbols-outlined">favorite<\/span>/,
      'href="./help_center.tsx"><div class="flex items-center gap-lg"><div class="w-12 h-12 rounded-full bg-primary-fixed"><span class="material-symbols-outlined">favorite</span>');
    c = c.replace(/href="\.\/home_child_safety_v1\.tsx">\s*<div class="flex items-center gap-lg">\s*<div class="w-12 h-12 rounded-full bg-surface-container-high[^"]*">\s*<span class="material-symbols-outlined">gavel<\/span>/,
      'href="./privacy_settings.tsx"><div class="flex items-center gap-lg"><div class="w-12 h-12 rounded-full bg-surface-container-high"><span class="material-symbols-outlined">gavel</span>');
    c = c.replace(/href="\.\/home_child_safety_v1\.tsx">\s*<div class="flex items-center gap-lg">\s*<div class="w-12 h-12 rounded-full bg-surface-container-high[^"]*">\s*<span class="material-symbols-outlined">lock<\/span>/,
      'href="./privacy_settings.tsx"><div class="flex items-center gap-lg"><div class="w-12 h-12 rounded-full bg-surface-container-high"><span class="material-symbols-outlined">lock</span>');
  }

  // --- REPORT DETAILS ---
  if (file === 'report_details.tsx') {
    c = addOnclickToButton(c, "J'ai une info", './signaler_un_enfant_trouv_tape_1.tsx');
    c = addOnclickToButton(c, 'Review Match', './ai_smart_matching.tsx');
  }

  // --- AI MATCHING ---
  if (file === 'ai_smart_matching.tsx') {
    c = addOnclickToButton(c, 'Confirm Match', './report_details.tsx');
    c = addOnclickToButton(c, 'Dismiss Match', './alert_center.tsx');
  }

  // --- MY CASE DASHBOARD ---
  if (file === 'my_case_dashboard_refined_actions.tsx') {
    c = addOnclickToButton(c, 'Edit', './report_details.tsx');
    c = c.replace(
      '<button class="fixed bottom-24 right-container-margin w-16 h-16 rounded-full fab-gradient',
      '<button onclick="window.location.href=\'./signaler_un_disparu_tape_1.tsx\'" class="fixed bottom-24 right-container-margin w-16 h-16 rounded-full fab-gradient'
    );
    c = c.replace(
      '<button class="flex-1 py-3 px-4 rounded-full font-label-bold text-label-bold bg-primary-container text-on-primary-container transition-all">',
      '<button onclick="window.location.href=\'./report_details.tsx\'" class="flex-1 py-3 px-4 rounded-full font-label-bold text-label-bold bg-primary-container text-on-primary-container transition-all">'
    );
  }

  // --- V2 PREVIEW ---
  if (file === 'v2_smart_device_preview.tsx') {
    c = addOnclickToButton(c, 'Join Waitlist', './smart_alerts_guardian_flow.tsx');
    c = addOnclickToButton(c, 'Learn More', './smart_alerts_guardian_flow.tsx');
    c = c.replace(
      '<button class="bg-primary hover:bg-primary-fixed',
      '<button onclick="history.back()" class="bg-primary hover:bg-primary-fixed'
    );
  }

  // --- SMART ALERTS ---
  if (file === 'smart_alerts_guardian_flow.tsx') {
    c = fixBottomNav(c);
    c = c.replace(
      '</a><a class="flex flex-col items-center justify-center transition-transform active:scale-90" href="./home_child_safety_v1.tsx">',
      '</a><a class="flex flex-col items-center justify-center transition-transform active:scale-90" href="./alert_center.tsx">'
    );
  }

  if (c !== orig) {
    write(file, c);
    updated++;
    console.log('✓', file);
  }
}

console.log(`\nNavigation repair complete. Updated ${updated} files.`);
