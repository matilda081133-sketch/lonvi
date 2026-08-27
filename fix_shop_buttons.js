const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Fixing shop page button colors...");

// 1. Force the normal button style to be black background (#0D0E11) and white text (#FFFFFF)
html = html.replace(
    /\.bg-brandgold,\s*a\.bg-brandgold,\s*button\.bg-brandgold\s*\{\s*background-color:\s*#FFFFFF\s*!important;\s*color:\s*#0D0E11\s*!important;\s*\}/g,
    '.bg-brandgold, a.bg-brandgold, button.bg-brandgold { background-color: #0D0E11 !important; color: #FFFFFF !important; }'
);

html = html.replace(
    /\.bg-brandgold,\s*a\.bg-brandgold,\s*button\.bg-brandgold\s*\{\s*background-color:\s*#0D0E11\s*!important;\s*color:\s*#0A0A0A\s*!important;[^}]*\}/g,
    '.bg-brandgold, a.bg-brandgold, button.bg-brandgold { background-color: #0D0E11 !important; color: #FFFFFF !important; }'
);

// 2. Fix the hover styles
html = html.replace(
    /a\.bg-brandgold:hover\s*\{\s*color:\s*#000000\s*!important;\s*background-color:\s*#FFFFFF\s*!important;\s*\}/g,
    'a.bg-brandgold:hover { color: #FFFFFF !important; background-color: #20242D !important; }'
);

html = html.replace(
    /\.hover\\:bg-brandgoldHover:hover,\s*a\\.hover\\:bg-brandgoldHover:hover,\s*button\\.hover\\:bg-brandgoldHover:hover\s*\{\s*background-color:\s*#20242D\s*!important;\s*color:\s*#0A0A0A\s*!important;[^}]*\}/g,
    '.hover\\:bg-brandgoldHover:hover, a\\.hover\\:bg-brandgoldHover:hover, button\\.hover\\:bg-brandgoldHover:hover { background-color: #20242D !important; color: #FFFFFF !important; }'
);

// 3. Make sure to clean up any remaining white background button styles
const buttonFixes = `
<style>
    /* Absolute button overrides */
    #lv-open-modal-btn, #lv-submit, a.bg-brandgold, button.bg-brandgold {
        background-color: #0D0E11 !important;
        color: #FFFFFF !important;
        border-color: #0D0E11 !important;
    }
    #lv-open-modal-btn:hover, #lv-submit:hover, a.bg-brandgold:hover, button.bg-brandgold:hover {
        background-color: #20242D !important;
        color: #FFFFFF !important;
        border-color: #20242D !important;
    }
</style>
`;

html = buttonFixes + html;
console.log("Button fixes prepended.");

fs.writeFileSync(file, html, 'utf8');

// 4. Update the artifact approved_shop_page_code.md
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на премиальную светлую тему с белым/светло-серым фоном (как просил клиент), БЕЗ желтого цвета, с высокой контрастностью всех текстов и контрастной ЧЕРНОЙ кнопкой заказа (высокая видимость на белом фоне) и анимированным заголовком LONVI PCC1.

\`\`\`html
${html}
\`\`\`
`;
fs.writeFileSync(destPath, mdContent, 'utf8');
console.log("Artifact updated.");

// 5. Sync and push to GitHub
const { execSync } = require('child_process');
try {
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Pushed successfully.");
} catch (e) {
    console.error("Push error:", e.message);
}
