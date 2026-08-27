const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Fixing shop heading animation override issue (forcing transparent fill)...");

// 1. Add highly specific styles at the end of the file to force text transparent fill and run animation correctly
const animForceOverride = `
<!-- FORCE GRADIENT TEXT ANIMATION OVER SPECIFICITY CONFLICTS -->
<style>
    #allrecords .gradient-text-animated, 
    #allrecords span.gradient-text-animated,
    body .gradient-text-animated,
    .gradient-text-animated {
        -webkit-text-fill-color: transparent !important;
        color: transparent !important;
        background-clip: text !important;
        -webkit-background-clip: text !important;
        display: inline-block !important;
        animation: gradient-move 8s linear infinite !important;
    }
</style>
`;

html = html + '\n' + animForceOverride;

fs.writeFileSync(file, html, 'utf8');
console.log("Force animation styles appended.");

// 2. Update the artifact approved_shop_page_code.md
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на премиальную светлую тему с белым/светло-серым фоном (как просил клиент), БЕЗ желтого цвета, с высокой контрастностью всех текстов, черной кнопкой заказа, оригинальной хромированной анимацией заголовка LONVI PCC1 (с защитой от конфликтов), а также металлическим градиентом для блока описания качества, карточки калькулятора заказа, плашки [ ИНФОРМАЦИЯ ], подзаголовка LONVI BIOSCIENCES PCC1 и верхнего бейджа преимуществ.

\`\`\`html
${html}
\`\`\`
`;
fs.writeFileSync(destPath, mdContent, 'utf8');
console.log("Artifact updated.");

// 3. Sync and push to GitHub
try {
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Pushed successfully.");
} catch (e) {
    console.error("Push error:", e.message);
}
