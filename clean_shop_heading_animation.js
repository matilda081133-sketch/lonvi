const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Cleaning up all animation styles and creating a single robust definition...");

// 1. Remove all styles related to gradient-text-animated, gradient-move, shine, lv-chrome-anim, gradient-move-shop-v3
// Let's remove the final overrides block we added in previous steps
html = html.replace(/<!-- FINAL OVERRIDES FOR ACCORDION OPEN STATE AND HEADING ANIMATION -->[\s\S]*?<\/style>/g, '');
html = html.replace(/<!-- ULTIMATE DESIGN CORRECTIONS AND CONTRAST FIXED -->[\s\S]*?<\/style>/g, '');
html = html.replace(/<!-- FAQ ACCORDION HOVER TEXT AND ICON COLOR OVERRIDES -->[\s\S]*?<\/style>/g, '');
html = html.replace(/<style>\s*@keyframes gradient-move[\s\S]*?<\/style>/g, '');

// Also remove any in-line declarations in other style tags
html = html.replace(/\.gradient-text-animated\s*\{[\s\S]*?\}/g, '');
html = html.replace(/@keyframes shine\s*\{[\s\S]*?\}/g, '');
html = html.replace(/@keyframes lv-chrome-anim\s*\{[\s\S]*?\}/g, '');
html = html.replace(/@keyframes gradient-move\s*\{[\s\S]*?\}/g, '');
html = html.replace(/@keyframes gradient-move-shop-v3\s*\{[\s\S]*?\}/g, '');

// 2. Prepend the single clean style declaration at the top of the file
const singleAnimationCSS = `
<style>
    @keyframes gradient-move {
        0% { background-position: 0% center; }
        100% { background-position: 300% center; }
    }
    
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
        animation: gradient-move 8s linear infinite !important;
    }

    /* FAQ Accordion Icon Color Overrides - ONLY style the plus/cross icon */
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

html = singleAnimationCSS + html;

fs.writeFileSync(file, html, 'utf8');
console.log("tilda_shop_page.html updated with cleaned single style block.");

// Update the artifact approved_shop_page_code.md
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на премиальную светлую тему с белым/светло-серым фоном (как просил клиент), БЕЗ желтого цвета, с высокой контрастностью всех текстов, черной кнопкой заказа, оригинальной хромированной анимацией заголовка LONVI PCC1, металлическим градиентом для блока описания качества, карточки калькулятора заказа, а также с исправленными ховерами и кликами для карточек FAQ (иконка открытия корректно остается белой и видимой при открытии/наведении, сами карточки остаются светлыми при наведении), и исправленной радио-галочкой при переключении тарифов.

\`\`\`html
${html}
\`\`\`
`;
fs.writeFileSync(destPath, mdContent, 'utf8');
console.log("Artifact updated.");

// Sync and push to GitHub
try {
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Pushed successfully.");
} catch (e) {
    console.error("Push error:", e.message);
}
