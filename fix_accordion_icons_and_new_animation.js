const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Restoring original FAQ card hover backgrounds and fixing ONLY the icons...");

// 1. Remove the previous "ULTIMATE DESIGN CORRECTIONS" block to replace it with the corrected one
const oldOverrideBlock = /<!-- ULTIMATE DESIGN CORRECTIONS AND CONTRAST FIXED -->[\s\S]*?<\/style>/g;
html = html.replace(oldOverrideBlock, '');

// 2. Append the corrected overrides at the end of the file
const correctedOverrides = `
<!-- ULTIMATE DESIGN CORRECTIONS AND CONTRAST FIXED -->
<style>
    /* Force exact chrome white-silver animated text gradient using cache-busting keyframe name */
    #allrecords .gradient-text-animated, 
    #allrecords span.gradient-text-animated,
    body .gradient-text-animated,
    .gradient-text-animated {
        background: linear-gradient(90deg, #FFFFFF 0%, #7E8694 25%, #F0F2F5 50%, #4C5363 75%, #FFFFFF 100%) !important;
        background-size: 300% auto !important;
        -webkit-background-clip: text !important;
        background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        color: transparent !important;
        display: inline-block !important;
        animation: gradient-move-shop-v3 8s linear infinite !important;
    }
    
    @keyframes gradient-move-shop-v3 {
        0% { background-position: 0% center; }
        100% { background-position: 300% center; }
    }

    /* FAQ Accordion Icon Color Overrides - ONLY style the plus/cross icon, keeping card texts original */
    /* Default state: black circle, black plus */
    #allrecords details.group summary span.relative {
        border-color: #0D0E11 !important;
        background-color: transparent !important;
        transition: all 0.3s ease !important;
    }
    #allrecords details.group summary svg,
    #allrecords details.group summary svg path,
    #allrecords details.group summary svg line {
        color: #0D0E11 !important;
        stroke: #0D0E11 !important;
    }
    
    /* Open state: black circle, white cross */
    #allrecords details.group[open] summary span.relative {
        background-color: #0D0E11 !important;
        border-color: #0D0E11 !important;
    }
    #allrecords details.group[open] summary svg,
    #allrecords details.group[open] summary svg path,
    #allrecords details.group[open] summary svg line {
        color: #FFFFFF !important;
        stroke: #FFFFFF !important;
    }
    
    /* Hover state (card becomes black): white circle, white plus */
    #allrecords details.group:hover summary span.relative {
        border-color: #FFFFFF !important;
        background-color: transparent !important;
    }
    #allrecords details.group:hover summary svg,
    #allrecords details.group:hover summary svg path,
    #allrecords details.group:hover summary svg line {
        color: #FFFFFF !important;
        stroke: #FFFFFF !important;
    }
    
    /* Open + Hover state (card is black): white circle, black cross */
    #allrecords details.group[open]:hover summary span.relative {
        background-color: #FFFFFF !important;
        border-color: #FFFFFF !important;
    }
    #allrecords details.group[open]:hover summary svg,
    #allrecords details.group[open]:hover summary svg path,
    #allrecords details.group[open]:hover summary svg line {
        color: #0D0E11 !important;
        stroke: #0D0E11 !important;
    }
</style>
`;

html = html + '\n' + correctedOverrides;

fs.writeFileSync(file, html, 'utf8');
console.log("tilda_shop_page.html updated with original hover styles restored.");

// 3. Update artifact approved_shop_page_code.md
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на премиальную светлую тему с белым/светло-серым фоном (как просил клиент), БЕЗ желтого цвета, с высокой контрастностью всех текстов, черной кнопкой заказа, оригинальной хромированной анимацией заголовка LONVI PCC1, металлическим градиентом для блока описания качества, карточки калькулятора заказа, а также с исправленными ховерами и кликами для карточек FAQ (иконка открытия корректно остается белой и видимой при открытии/наведении, сами карточки остаются светлыми при наведении), и исправленной радио-галочкой при переключении тарифов.

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
