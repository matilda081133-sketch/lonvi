const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Applying metallic gradients to badges and updating heading animation script...");

// 1. Rename animation to lv-chrome-anim and define robust keyframes
html = html.replace(
    /\.gradient-text-animated\s*\{[\s\S]*?\}/g,
    `.gradient-text-animated {
        background: linear-gradient(90deg, #FFFFFF 0%, #7E8694 25%, #F0F2F5 50%, #4C5363 75%, #FFFFFF 100%) !important;
        background-size: 200% auto !important;
        -webkit-background-clip: text !important;
        background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        animation: lv-chrome-anim 8s linear infinite !important;
        display: inline-block !important;
    }`
);

// Define @keyframes lv-chrome-anim at the top in a style block
const animStyleBlock = `
<style>
    @keyframes lv-chrome-anim {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
</style>
`;
html = animStyleBlock + html;

// 2. Fix the [ ИНФОРМАЦИЯ ] badge: apply metallic gradient background, white text and thin border
html = html.replace(
    /class="text-xs md:text-sm font-bold tracking-\[0\.3em\] uppercase inline-block bg-neutral-900 text-white px-4 py-2 rounded-sm border border-neutral-200 break-words">\[ ИНФОРМАЦИЯ \]/g,
    `class="text-xs md:text-sm font-bold tracking-[0.3em] uppercase inline-block px-4 py-2 rounded-sm break-words" style="background: linear-gradient(135deg, #0D0E11 0%, #1A1C22 35%, #2F3542 70%, #4C5363 100%) !important; color: #FFFFFF !important; border: 1px solid rgba(255,255,255,0.12) !important;">[ ИНФОРМАЦИЯ ]`
);

// Fallback in case of previous replacement variants
html = html.replace(
    /text-brandgold([^>]*>\[\s*ИНФОРМАЦИЯ\s*\])/g,
    `text-white$1`
);
html = html.replace(
    /bg-neutral-900([^>]*>\[\s*ИНФОРМАЦИЯ\s*\])/g,
    `px-4 py-2 rounded-sm" style="background: linear-gradient(135deg, #0D0E11 0%, #1A1C22 35%, #2F3542 70%, #4C5363 100%) !important; color: #FFFFFF !important; border: 1px solid rgba(255,255,255,0.12) !important;"$1`
);

// 3. Fix the container wrapping "LONVI BIOSCIENCES PCC1": apply metallic gradient to the wrapper div
html = html.replace(
    /<div class="bg-black w-fit px-3 py-1 mb-2 rounded-sm"><h2 class="text-lg md:text-xl font-bold text-brandgold font-mono m-0" style="color:#FFFFFF!important">LONVI BIOSCIENCES PCC1<\/h2><\/div>/g,
    `<div class="w-fit px-3 py-1 mb-2 rounded-sm" style="background: linear-gradient(135deg, #0D0E11 0%, #1A1C22 35%, #2F3542 70%, #4C5363 100%) !important; border: 1px solid rgba(255,255,255,0.12) !important;"><h2 class="text-lg md:text-xl font-bold text-brandgold font-mono m-0" style="color:#FFFFFF!important">LONVI BIOSCIENCES PCC1</h2></div>`
);

// Fallback replacement for the wrapper div
html = html.replace(
    /<div class="bg-black w-fit px-3 py-1 mb-2 rounded-sm">(\s*<h2 class="text-lg md:text-xl font-bold text-brandgold font-mono m-0" style="color:#FFFFFF!important">LONVI BIOSCIENCES PCC1<\/h2>)\s*<\/div>/g,
    `<div class="w-fit px-3 py-1 mb-2 rounded-sm" style="background: linear-gradient(135deg, #0D0E11 0%, #1A1C22 35%, #2F3542 70%, #4C5363 100%) !important; border: 1px solid rgba(255,255,255,0.12) !important;">$1</div>`
);

// 4. Fix the "ИННОВАЦИОННЫЙ ФИТОСОМАЛЬНЫЙ..." badge: apply metallic gradient background, white text and thin border
html = html.replace(
    /style="background-color:#1A1C20!important;\s*color:#FFFFFF!important;\s*text-wrap:\s*balance;\s*text-align:\s*left;"/g,
    'style="background: linear-gradient(135deg, #0D0E11 0%, #1A1C22 35%, #2F3542 70%, #4C5363 100%) !important; color:#FFFFFF!important; border: 1px solid rgba(255,255,255,0.12) !important; text-wrap: balance; text-align: left;"'
);

fs.writeFileSync(file, html, 'utf8');
console.log("tilda_shop_page.html written with metallic badges.");

// 5. Update artifact approved_shop_page_code.md
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на премиальную светлую тему с белым/светло-серым фоном (как просил клиент), БЕЗ желтого цвета, с высокой контрастностью всех текстов, черной кнопкой заказа, оригинальной хромированной анимацией заголовка LONVI PCC1 (с защитой от конфликтов), а также металлическим градиентом для блока описания качества, карточки калькулятора заказа, плашки [ ИНФОРМАЦИЯ ], подзаголовка LONVI BIOSCIENCES PCC1 и верхнего бейджа преимуществ.

\`\`\`html
${html}
\`\`\`
`;
fs.writeFileSync(destPath, mdContent, 'utf8');
console.log("Artifact updated.");

// 6. Sync and push to GitHub
try {
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Pushed successfully.");
} catch (e) {
    console.error("Push error:", e.message);
}
