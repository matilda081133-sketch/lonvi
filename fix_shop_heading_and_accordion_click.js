const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Fixing shop heading animation parameters and accordion open state icon blending...");

const finalFixBlock = `
<!-- FINAL OVERRIDES FOR ACCORDION OPEN STATE AND HEADING ANIMATION -->
<style>
    /* 1. Force exact background size and animation parameters for the heading */
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
    
    @keyframes gradient-move {
        0% { background-position: 0% center; }
        100% { background-position: 300% center; }
    }

    /* 2. Force open state accordion icon visibility (white stroke inside dark circle) */
    #allrecords details[open] summary svg,
    #allrecords details[open] summary svg path,
    #allrecords details[open] summary svg line {
        color: #FFFFFF !important;
        stroke: #FFFFFF !important;
    }
    
    #allrecords details[open] summary span.relative {
        border-color: #0D0E11 !important;
        background-color: #0D0E11 !important;
    }
    
    /* 3. When hovered, make the icon circle border white to contrast with the black hovered card */
    #allrecords details.group:hover summary span.relative {
        border-color: #FFFFFF !important;
    }
</style>
`;

html = html + '\n' + finalFixBlock;

fs.writeFileSync(file, html, 'utf8');
console.log("Overrides appended.");

// Update the artifact approved_shop_page_code.md
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на премиальную светлую тему с белым/светло-серым фоном (как просил клиент), БЕЗ желтого цвета, с высокой контрастностью всех текстов, черной кнопкой заказа, оригинальной хромированной анимацией заголовка LONVI PCC1, металлическим градиентом для блока описания качества, карточки калькулятора заказа, а также с исправленными ховерами и кликами для карточек FAQ (иконка открытия корректно остается белой и видимой при открытии/наведении).

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
