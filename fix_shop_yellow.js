const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Fixing yellow color issues in shop page...");

// 1. Update Tailwind config colors in shop page
html = html.replace(/brandgold:\s*'#FFD700'/g, "brandgold: '#E2E5E9'");
html = html.replace(/brandgoldHover:\s*'#F2C800'/g, "brandgoldHover: '#FFFFFF'");
html = html.replace(/neutral:\s*\{\s*white:\s*'#FFFFFF',\s*gray:\s*'#F5F5F7',\s*darkgray:\s*'#E5E5E5',\s*black:\s*'#1D1D1F'\s*\}/g, `neutral: {
                            white: '#FFFFFF',
                            gray: '#20242D',
                            darkgray: '#E5E5E5',
                            black: '#0D0E11'
                        }`);

// 2. Replace hardcoded style rules of brandgold in the head style tag
html = html.replace(/\.text-brandgold\s*\{\s*color:\s*#FFD700\s*!important;\s*\}/g, '.text-brandgold { color: #E2E5E9 !important; }');
html = html.replace(/background-color:\s*#FFD700\s*!important/g, 'background: linear-gradient(90deg, #FFFFFF 0%, #D8DCE3 50%, #FFFFFF 100%) !important');
html = html.replace(/background-color:\s*#FFE866\s*!important/g, 'background-color: #FFFFFF !important');
html = html.replace(/color:\s*#FFD700\s*!important/g, 'color: #E2E5E9 !important');
html = html.replace(/color:\s*#FFD700/g, 'color: #E2E5E9');
html = html.replace(/#FFD700/g, '#E2E5E9');
html = html.replace(/#FFE866/g, '#FFFFFF');
html = html.replace(/#F2C800/g, '#FFFFFF');

// 3. Make sure any other yellow styles in CSS are overridden
// Add a clean rule to make everything monochrome silver
const silverStyleBlock = `
<style>
    /* Absolute monochrome steel-silver overrides */
    .text-brandgold, [style*="color:#FFD700"], [style*="color: #FFD700"] {
        color: #E2E5E9 !important;
    }
    .bg-brandgold, [style*="background-color:#FFD700"] {
        background: linear-gradient(90deg, #FFFFFF 0%, #D8DCE3 50%, #FFFFFF 100%) !important;
        color: #0D0E11 !important;
    }
    /* Let's verify form checkout button */
    #checkout-modal button[type="submit"], #lv-open-modal-btn {
        background: linear-gradient(90deg, #FFFFFF 0%, #D8DCE3 50%, #FFFFFF 100%) !important;
        color: #0D0E11 !important;
    }
</style>
`;
const headEndTag = '</head>';
const headEndIdx = html.indexOf(headEndTag);
if (headEndIdx !== -1) {
    html = html.substring(0, headEndIdx) + silverStyleBlock + html.substring(headEndIdx);
}

fs.writeFileSync(file, html, 'utf8');
console.log("Shop page yellow fixes complete.");

// 4. Update the artifact
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на темный металлический градиент бренда, БЕЗ желтого цвета (все желтые элементы заменены на серебряный металлик и белый), с серебряной металлической кнопкой заказа.

\`\`\`html
${html}
\`\`\`
`;
fs.writeFileSync(destPath, mdContent, 'utf8');
console.log("Shop page artifact updated!");

// 5. Sync and push to GitHub
const { execSync } = require('child_process');
try {
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Changes pushed to GitHub successfully!");
} catch (e) {
    console.error("Error during sync and push:", e.message);
}
