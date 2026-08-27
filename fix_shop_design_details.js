const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Fixing detailed shop page contrast and styling issues...");

// 1. Fix the main heading animation styles (change gradient from dark to original chrome white-silver)
html = html.replace(
    /\.gradient-text-animated\s*\{[\s\S]*?\}/g,
    `.gradient-text-animated {
        background: linear-gradient(90deg, #FFFFFF 0%, #7E8694 25%, #F0F2F5 50%, #4C5363 75%, #FFFFFF 100%) !important;
        background-size: 300% auto !important;
        -webkit-background-clip: text !important;
        background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        animation: gradient-move 8s linear infinite !important;
        display: inline-block !important;
    }`
);

// Add @keyframes gradient-move overrides
const keyframesFix = `
<style>
    @keyframes gradient-move {
        to { background-position: 300% center; }
    }
</style>
`;
html = keyframesFix + html;

// 2. Fix the badge "ИННОВАЦИОННЫЙ ФИТОСОМАЛЬНЫЙ..." text color (change color:#0D0E11 to color:#FFFFFF)
html = html.replace(
    /style="background-color:#1A1C20!important;\s*color:#0D0E11!important;\s*text-wrap:\s*balance;\s*text-align:\s*left;"/g,
    'style="background-color:#1A1C20!important; color:#FFFFFF!important; text-wrap: balance; text-align: left;"'
);

// 3. Fix the label "Эффективность + доступная цена" text color (change color:#0D0E11 to color:#FFFFFF)
html = html.replace(
    /style="background-color:#1A1C20!important;\s*color:#0D0E11!important"/g,
    'style="background-color:#1A1C20!important; color:#FFFFFF!important"'
);

// 4. Fix the heading "LONVI BIOSCIENCES PCC1" text color (change color:#0D0E11 to color:#FFFFFF)
html = html.replace(
    /style="color:#0D0E11!important">\s*LONVI BIOSCIENCES PCC1/g,
    'style="color:#FFFFFF!important">LONVI BIOSCIENCES PCC1'
);

// 5. Replace solid #1A1C20 background of the "PCC1 — выбор тех..." container with the brand metallic gradient
const oldContainerBg = 'style="background-color:#1A1C20!important"';
const newContainerBg = 'style="background: linear-gradient(135deg, #0D0E11 0%, #1A1C22 35%, #2F3542 70%, #4C5363 100%) !important; border: 1px solid rgba(255, 255, 255, 0.1) !important;"';

if (html.includes(oldContainerBg)) {
    // Only replace the one right before the description paragraph (we'll replace all if safe, or target it)
    html = html.replace(oldContainerBg, newContainerBg);
    console.log("Container background changed to metallic gradient!");
}

// 6. Write back to file
fs.writeFileSync(file, html, 'utf8');
console.log("tilda_shop_page.html updated with detail fixes.");

// 7. Update artifact approved_shop_page_code.md
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на премиальную светлую тему с белым/светло-серым фоном (как просил клиент), БЕЗ желтого цвета, с высокой контрастностью всех текстов, черной кнопкой заказа, оригинальной хромированной анимацией заголовка LONVI PCC1, а также металлическим градиентом для блока описания качества.

\`\`\`html
${html}
\`\`\`
`;
fs.writeFileSync(destPath, mdContent, 'utf8');
console.log("Artifact updated.");

// 8. Sync and push to GitHub
try {
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Pushed successfully.");
} catch (e) {
    console.error("Push error:", e.message);
}
