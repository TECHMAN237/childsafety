const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const screensDir = path.join(projectRoot, 'screens');

// Create screens directory if it doesn't exist
if (!fs.existsSync(screensDir)) {
  fs.mkdirSync(screensDir, { recursive: true });
  console.log('✅ Created /screens directory.');
}

// Get all items in the root directory
const items = fs.readdirSync(projectRoot);

const foldersToProcess = items.filter(item => {
  const itemPath = path.join(projectRoot, item);
  return fs.statSync(itemPath).isDirectory() && item !== 'screens' && !item.startsWith('.');
});

let movedCount = 0;

foldersToProcess.forEach(folder => {
  const folderPath = path.join(projectRoot, folder);
  // We're looking for code.html based on our analysis, but we also support page.tsx if it exists
  const htmlPath = path.join(folderPath, 'code.html');
  const tsxPath = path.join(folderPath, 'page.tsx');
  
  let sourceFile = null;
  
  if (fs.existsSync(htmlPath)) {
    sourceFile = htmlPath;
  } else if (fs.existsSync(tsxPath)) {
    sourceFile = tsxPath;
  }

  if (sourceFile) {
    const targetFileName = `${folder}.tsx`;
    const targetFilePath = path.join(screensDir, targetFileName);

    // Read content
    let content = fs.readFileSync(sourceFile, 'utf8');

    // FIX 1: Replace old relative paths with the new flat structure
    foldersToProcess.forEach(targetFolder => {
      // e.g., href="../home_child_safety_v1/code.html" -> href="./home_child_safety_v1.tsx"
      const oldHtmlRef = new RegExp(`href=["']\\.\\./${targetFolder}/(code\\.html|page\\.tsx)["']`, 'g');
      content = content.replace(oldHtmlRef, `href="./${targetFolder}.tsx"`);

      // Fallback for cases like href="../home_child_safety_v1/"
      const oldDirRef = new RegExp(`href=["']\\.\\./${targetFolder}/?["']`, 'g');
      content = content.replace(oldDirRef, `href="./${targetFolder}.tsx"`);
    });

    // FIX 2: Connect the Global Bottom Navigation Bar
    // Replace Home link
    content = content.replace(
      /<a([^>]*)href=["']#["']([^>]*)>\s*<span[^>]*>home<\/span>\s*<span[^>]*>Home<\/span>\s*<\/a>/gi,
      `<a$1href="./home_child_safety_v1.tsx"$2>\n<span class="material-symbols-outlined">home</span>\n<span class="font-label-sm text-label-sm">Home</span>\n</a>`
    );

    // Replace Reports link
    content = content.replace(
      /<a([^>]*)href=["']#["']([^>]*)>\s*<span[^>]*>description<\/span>\s*<span[^>]*>Reports<\/span>\s*<\/a>/gi,
      `<a$1href="./reports_directory.tsx"$2>\n<span class="material-symbols-outlined">description</span>\n<span class="font-label-sm text-label-sm">Reports</span>\n</a>`
    );

    // Replace Alerts link
    content = content.replace(
      /<a([^>]*)href=["']#["']([^>]*)>\s*<span[^>]*>warning<\/span>\s*<span[^>]*>Alerts<\/span>\s*<\/a>/gi,
      `<a$1href="./alert_center.tsx"$2>\n<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">warning</span>\n<span class="font-label-sm text-label-sm">Alerts</span>\n</a>`
    );

    // Replace Profile link
    content = content.replace(
      /<a([^>]*)href=["']#["']([^>]*)>\s*<span[^>]*>person<\/span>\s*<span[^>]*>Profile<\/span>\s*<\/a>/gi,
      `<a$1href="./guardian_profile_updated_my_reports.tsx"$2>\n<span class="material-symbols-outlined">person</span>\n<span class="font-label-sm text-label-sm">Profile</span>\n</a>`
    );

    // FIX 3: Connect Missing Child Flow
    if (folder === 'signaler_un_disparu_tape_1') {
      content = content.replace(/href=["']#["']/g, `href="./v_rifier_le_lien_de_parent.tsx"`);
    } else if (folder === 'v_rifier_le_lien_de_parent') {
      content = content.replace(/href=["']#["']/g, `href="./report_under_review_missing_child.tsx"`);
    }

    // FIX 4: Connect Found Child Flow
    if (folder === 'signaler_un_enfant_trouv_tape_1') {
      content = content.replace(/href=["']#["']/g, `href="./signaler_un_enfant_trouv_d_tails_de_la_d_couverte.tsx"`);
    } else if (folder === 'signaler_un_enfant_trouv_d_tails_de_la_d_couverte') {
      content = content.replace(/href=["']#["']/g, `href="./v_rifier_le_signalement_tape_2_evidence.tsx"`);
    } else if (folder === 'v_rifier_le_signalement_tape_2_evidence') {
      content = content.replace(/href=["']#["']/g, `href="./report_under_review_missing_child.tsx"`);
    }

    // FIX 5: Ensure 'report_under_review_missing_child' links back to Home
    if (folder === 'report_under_review_missing_child') {
      // We will blindly replace all # with home in this specific file as requested (Back to Home button)
      content = content.replace(/href=["']#["']/g, `href="./home_child_safety_v1.tsx"`);
    }
    
    // Write to new location
    fs.writeFileSync(targetFilePath, content, 'utf8');
    console.log(`✅ Moved and updated ${folder}/${path.basename(sourceFile)} ➔ screens/${targetFileName}`);
    movedCount++;

    // Clean up the entire old folder
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log(`🗑️ Deleted original folder: /${folder}`);
  }
});

console.log(`\n🎉 Refactoring Complete! Processed ${movedCount} screens. Navigation fully connected.`);
