const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Fixing shop page summary box styling and dark metallic heading animation...");

// 1. Update the .gradient-text-animated style declaration to use dark metallic colors for high contrast on white background
html = html.replace(
    /background:\s*linear-gradient\(90deg,\s*#FFFFFF\s*0%,\s*#7E8694\s*25%,\s*#F0F2F5\s*50%,\s*#4C5363\s*75%,\s*#FFFFFF\s*100%\)\s*!important;/g,
    "background: linear-gradient(90deg, #0D0E11 0%, #4C5363 25%, #8A94A6 50%, #4C5363 75%, #0D0E11 100%) !important;"
);

// Double check inside the custom styles block to ensure it's updated
html = html.replace(
    /background:\s*linear-gradient\(90deg,\s*#FFFFFF\s*0%,\s*#7E8694\s*25%,\s*#F0F2F5\s*50%,\s*#4C5363\s*75%,\s*#FFFFFF\s*100%\)\s*!important;\s*background-size:\s*300%\s*auto\s*!important;/g,
    "background: linear-gradient(90deg, #0D0E11 0%, #4C5363 25%, #8A94A6 50%, #4C5363 75%, #0D0E11 100%) !important;\n        background-size: 200% auto !important;"
);

// 2. Add high-specificity styling for the summary box to have the metallic gradient background
const summaryStyle = `
<style>
    /* HIGH SPECIFICITY DYNAMIC SUMMARY BOX METALLIC GRADIENT */
    #allrecords .bg-transparent.border.border-black\\/20,
    #allrecords div[class*="bg-transparent"][class*="border-black/20"] {
        background: linear-gradient(135deg, #0D0E11 0%, #1A1C22 35%, #2F3542 70%, #4C5363 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        padding: 16px !important;
    }
    
    /* Force white text inside summary box */
    #allrecords .bg-transparent.border.border-black\\/20 span,
    #allrecords .bg-transparent.border.border-black\\/20 div,
    #allrecords .bg-transparent.border.border-black\\/20 p {
        color: #FFFFFF !important;
    }
    
    #allrecords .bg-transparent.border.border-black\\/20 #summary-savings {
        color: #FFFFFF !important;
        font-weight: 800 !important;
    }
    
    /* Ensure summary-old line-through has some transparency */
    #allrecords .bg-transparent.border.border-black\\/20 #summary-old {
        color: rgba(255, 255, 255, 0.5) !important;
        text-decoration: line-through !important;
    }
</style>
`;

html = summaryStyle + html;
console.log("Summary styles prepended.");

fs.writeFileSync(file, html, 'utf8');

// 3. Update the artifact approved_shop_page_code.md
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на премиальную светлую тему с белым/светло-серым фоном (как просил клиент), БЕЗ желтого цвета, с высокой контрастностью всех текстов, черной кнопкой заказа, оригинальной хромированной анимацией заголовка LONVI PCC1, металлическим градиентом для блока описания качества, а также металлическим градиентом для карточки калькулятора заказа (сводки).

\`\`\`html
${html}
\`\`\`
`;
fs.writeFileSync(destPath, mdContent, 'utf8');
console.log("Artifact updated.");

// 4. Sync and push to GitHub
try {
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Pushed successfully.");
} catch (e) {
    console.error("Push error:", e.message);
}
