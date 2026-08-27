const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Restoring exact white-silver chrome heading animation to shop page...");

// 1. Restore the exact white-silver chrome gradient on .gradient-text-animated
html = html.replace(
    /background:\s*linear-gradient\(90deg,\s*#0D0E11\s*0%,\s*#4C5363\s*25%,\s*#8A94A6\s*50%,\s*#4C5363\s*75%,\s*#0D0E11\s*100%\)\s*!important;\s*background-size:\s*200%\s*auto\s*!important;/g,
    `background: linear-gradient(90deg, #FFFFFF 0%, #7E8694 25%, #F0F2F5 50%, #4C5363 75%, #FFFFFF 100%) !important;
        background-size: 300% auto !important;`
);

// Fallback in case of formatting variations
html = html.replace(
    /background:\s*linear-gradient\(90deg,\s*#0D0E11\s*0%,\s*#4C5363\s*25%,\s*#8A94A6\s*50%,\s*#4C5363\s*75%,\s*#0D0E11\s*100%\)\s*!important;/g,
    "background: linear-gradient(90deg, #FFFFFF 0%, #7E8694 25%, #F0F2F5 50%, #4C5363 75%, #FFFFFF 100%) !important;"
);

// Ensure background-size is 300% and animation is gradient-move 8s
html = html.replace(
    /animation:\s*gradient-move\s*6s\s*linear\s*infinite\s*!important;/g,
    "animation: gradient-move 8s linear infinite !important;"
);

fs.writeFileSync(file, html, 'utf8');
console.log("Heading gradient restored.");

// 2. Update the artifact approved_shop_page_code.md
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренко код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на премиальную светлую тему с белым/светло-серым фоном (как просил клиент), БЕЗ желтого цвета, с высокой контрастностью всех текстов, черной кнопкой заказа, оригинальной хромированной анимацией заголовка LONVI PCC1 (в точности как на главном экране главной страницы), металлическим градиентом для блока описания качества и карточки калькулятора заказа.

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
