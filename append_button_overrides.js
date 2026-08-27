const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Appending high specificity button overrides at the end of shop page...");

const buttonOverrides = `
<!-- LAST LOADED HIGH-SPECIFICITY OVERRIDES FOR CONTRASTY BUTTONS -->
<style>
    #allrecords #lv-open-modal-btn, 
    #allrecords #lv-submit,
    #allrecords a.bg-brandgold, 
    #allrecords button.bg-brandgold,
    #allrecords .bg-brandgold,
    #allrecords .bg-white.text-black.hover\\:bg-brandgoldHover {
        background-color: #0D0E11 !important;
        background: #0D0E11 !important;
        color: #FFFFFF !important;
        border-color: #0D0E11 !important;
    }
    
    #allrecords #lv-open-modal-btn:hover, 
    #allrecords #lv-submit:hover,
    #allrecords a.bg-brandgold:hover, 
    #allrecords button.bg-brandgold:hover,
    #allrecords .bg-brandgold:hover,
    #allrecords .bg-white.text-black.hover\\:bg-brandgoldHover:hover {
        background-color: #20242D !important;
        background: #20242D !important;
        color: #FFFFFF !important;
        border-color: #20242D !important;
    }
</style>
`;

html = html + '\n' + buttonOverrides;

fs.writeFileSync(file, html, 'utf8');
console.log("Button overrides appended.");

// Update the artifact approved_shop_page_code.md
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на премиальную светлую тему с белым/светло-серым фоном (как просил клиент), БЕЗ желтого цвета, с высокой контрастностью всех текстов и контрастной ЧЕРНОЙ кнопкой заказа (высокая видимость на белом фоне) и анимированным заголовком LONVI PCC1.

\`\`\`html
${html}
\`\`\`
`;
fs.writeFileSync(destPath, mdContent, 'utf8');
console.log("Artifact updated.");

// Sync and push to GitHub
const { execSync } = require('child_process');
try {
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Pushed successfully.");
} catch (e) {
    console.error("Push error:", e.message);
}
