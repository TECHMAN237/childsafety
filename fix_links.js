const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'screens');

if (!fs.existsSync(screensDir)) {
    console.error("Screens directory not found!");
    process.exit(1);
}

const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.tsx'));

let updatedFilesCount = 0;

files.forEach(file => {
    const filePath = path.join(screensDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // 1. Fix all BACK buttons
    // Matches buttons containing 'arrow_back' or similar back arrow texts
    content = content.replace(
        /<button([^>]*)>([\s\S]*?)arrow_back([\s\S]*?)<\/button>/gi,
        (match, attrs, before, after) => {
            if (!attrs.includes('onclick')) {
                return `<button${attrs} onclick="history.back()">` + before + 'arrow_back' + after + '</button>';
            }
            return match;
        }
    );
    
    // Fallback for anchor back buttons
    content = content.replace(
        /<a([^>]*)>([\s\S]*?)arrow_back([\s\S]*?)<\/a>/gi,
        (match, attrs, before, after) => {
            if (attrs.includes('href="#"') || !attrs.includes('href=')) {
                let newAttrs = attrs.replace(/href=["']#?["']/i, '');
                return `<a${newAttrs} href="#" onclick="history.back(); return false;">` + before + 'arrow_back' + after + '</a>';
            }
            return match;
        }
    );

    // 2. Fix specific screen flows

    if (file === 'success_account_created.tsx') {
        content = content.replace(/href=["']#["']/gi, 'href="./basic_information.tsx"');
        content = content.replace(/<button([^>]*)>/gi, (match, attrs) => {
            if (!attrs.includes('onclick') && !attrs.includes('type="submit"')) {
                return `<button${attrs} onclick="window.location.href='./basic_information.tsx'">`;
            }
            return match;
        });
    }

    if (file === 'basic_information.tsx') {
        content = content.replace(/action=["']#["']/gi, 'action="./onboarding_community_protection_step_1.tsx"');
        // If there's a skip button
        content = content.replace(/>\s*Skip\s*<\/a>/gi, ' href="./home_child_safety_v1.tsx">Skip</a>');
    }

    if (file.startsWith('onboarding_')) {
        content = content.replace(/href=["']#["']/gi, 'href="./home_child_safety_v1.tsx"');
        content = content.replace(/<button([^>]*)>([\s\S]*?)(Continue|Get Started|Next)([\s\S]*?)<\/button>/gi, 
            (match, attrs, b, text, a) => {
                if (!attrs.includes('onclick')) {
                    return `<button${attrs} onclick="window.location.href='./home_child_safety_v1.tsx'">` + b + text + a + '</button>';
                }
                return match;
        });
    }

    if (file === 'home_child_safety_v1.tsx') {
        // Report missing child card/button
        content = content.replace(
            /onclick=["'][^"']*["']([^>]*)>([\s\S]*?)Report Missing Child/gi,
            'onclick="window.location.href=\'./signaler_un_disparu_tape_1.tsx\'"$1>$2Report Missing Child'
        );
        content = content.replace(
            /<button([^>]*)>([\s\S]*?)Report Missing Child/gi,
            (match, attrs, rest) => {
                if (!attrs.includes('onclick')) return `<button${attrs} onclick="window.location.href='./signaler_un_disparu_tape_1.tsx'">` + rest + 'Report Missing Child';
                return match;
            }
        );

        // Report found child
        content = content.replace(
            /onclick=["'][^"']*["']([^>]*)>([\s\S]*?)Report Found Child/gi,
            'onclick="window.location.href=\'./signaler_un_enfant_trouv_tape_1.tsx\'"$1>$2Report Found Child'
        );
        content = content.replace(
            /<button([^>]*)>([\s\S]*?)Report Found Child/gi,
            (match, attrs, rest) => {
                if (!attrs.includes('onclick')) return `<button${attrs} onclick="window.location.href='./signaler_un_enfant_trouv_tape_1.tsx'">` + rest + 'Report Found Child';
                return match;
            }
        );

        // View Alerts / View Report
        content = content.replace(/href=["']#["']/gi, 'href="./alert_center.tsx"');
    }

    if (file === 'alert_center.tsx') {
        // Fix "View Details" or "Review Match" buttons
        content = content.replace(/<button([^>]*)>([\s\S]*?)View Details([\s\S]*?)<\/button>/gi, 
            `<button$1 onclick="window.location.href='./report_details.tsx'">$2View Details$3</button>`);
        content = content.replace(/<button([^>]*)>([\s\S]*?)Review Match([\s\S]*?)<\/button>/gi, 
            `<button$1 onclick="window.location.href='./ai_smart_matching.tsx'">$2Review Match$3</button>`);
        content = content.replace(/<button([^>]*)>([\s\S]*?)View Report([\s\S]*?)<\/button>/gi, 
            `<button$1 onclick="window.location.href='./report_details.tsx'">$2View Report$3</button>`);
    }

    if (file === 'reports_directory.tsx') {
        // Link all cards to report details
        content = content.replace(/href=["']#["']/gi, 'href="./report_details.tsx"');
    }

    if (file === 'guardian_profile_updated_my_reports.tsx') {
        // Settings links
        content = content.replace(/>\s*Privacy Settings\s*<\/div>/gi, ' onclick="window.location.href=\'./privacy_settings.tsx\'">Privacy Settings</div>');
        content = content.replace(/>\s*Notification Preferences\s*<\/div>/gi, ' onclick="window.location.href=\'./notifications_settings.tsx\'">Notification Preferences</div>');
        content = content.replace(/>\s*Emergency Contacts\s*<\/div>/gi, ' onclick="window.location.href=\'./emergency_preferences.tsx\'">Emergency Contacts</div>');
        content = content.replace(/>\s*Manage Case\s*<\/button>/gi, '>Manage Case</button>').replace(/<button([^>]*)>([\s\S]*?)Manage Case/gi, `<button$1 onclick="window.location.href='./my_case_dashboard_refined_actions.tsx'">$2Manage Case`);
    }

    // 3. Global form fallbacks
    // Any form still pointing to # should redirect to home
    content = content.replace(/<form([^>]*)action=["']#["']([^>]*)>/gi, '<form$1action="./home_child_safety_v1.tsx"$2>');
    
    // 4. Any remaining href="#" in general anchors (that aren't bottom navs) should go back to home as a safe default fallback,
    // but ONLY if they are not already fixed.
    content = content.replace(/href=["']#["']/gi, 'href="./home_child_safety_v1.tsx"');


    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedFilesCount++;
    }
});

console.log(`✅ Successfully fixed navigation links and back buttons across ${updatedFilesCount} screens!`);
