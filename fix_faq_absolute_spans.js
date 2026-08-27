const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Replacing FAQ CSS overrides with the perfect rule-set for absolute span lines...");

// 1. Remove previous ULTIMATE DESIGN CORRECTIONS block
html = html.replace(/<!-- ULTIMATE DESIGN CORRECTIONS AND CONTRAST FIXED -->[\s\S]*?<\/style>/g, '');

// 2. Append the corrected block containing the new matrix and heading animation
const perfectOverrides = `
<!-- ULTIMATE DESIGN CORRECTIONS AND CONTRAST FIXED -->
<style>
    /* Force exact chrome white-silver animated text gradient using cache-busting keyframe name */
    #allrecords .gradient-text-animated, 
    #allrecords span.gradient-text-animated,
    body .gradient-text-animated,
    .gradient-text-animated {
        background: linear-gradient(90deg, #FFFFFF 0%, #7E8694 25%, #F0F2F5 50%, #4C5363 75%, #FFFFFF 100%);
        background-size: 300% auto;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        display: inline-block;
        animation: gradient-move-shop-v3 8s linear infinite;
    }
    
    @keyframes gradient-move-shop-v3 {
        0% { background-position: 0% center; }
        100% { background-position: 300% center; }
    }

    /* FAQ ACCORDION PERFECT 4-STATE OVERRIDES FOR INNER ABSOLUTE SPAN LINES */
    
    /* State 1: Closed, Not Hovered (Default) */
    details.group summary span.pr-8,
    details.group summary div {
        color: #0D0E11 !important;
        transition: color 0.3s ease !important;
    }
    details.group summary span.rounded-full {
        border-color: #D1D5DB !important;
        background-color: transparent !important;
        transition: all 0.3s ease !important;
    }
    details.group summary span.rounded-full span.absolute {
        background-color: #0D0E11 !important;
        transition: background-color 0.3s ease !important;
    }

    /* State 2: Closed, Hovered (Card turns black, text and icon lines turn white) */
    details.group:hover summary span.pr-8,
    details.group:hover summary div {
        color: #FFFFFF !important;
    }
    details.group:hover summary span.rounded-full {
        border-color: #FFFFFF !important;
        background-color: transparent !important;
    }
    details.group:hover summary span.rounded-full span.absolute {
        background-color: #FFFFFF !important;
    }

    /* State 3: Open, Not Hovered (Card is light, text is black, icon is black circle with white cross) */
    details.group[open] summary span.pr-8,
    details.group[open] summary div {
        color: #0D0E11 !important;
    }
    details.group[open] summary span.rounded-full {
        background-color: #0D0E11 !important;
        border-color: #0D0E11 !important;
    }
    details.group[open] summary span.rounded-full span.absolute {
        background-color: #FFFFFF !important;
    }

    /* State 4: Open, Hovered (Card turns black, text becomes white, icon is white circle with black cross) */
    details.group[open]:hover summary span.pr-8,
    details.group[open]:hover summary div {
        color: #FFFFFF !important;
    }
    details.group[open]:hover summary span.rounded-full {
        background-color: #FFFFFF !important;
        border-color: #FFFFFF !important;
    }
    details.group[open]:hover summary span.rounded-full span.absolute {
        background-color: #0D0E11 !important;
    }
</style>
`;

html = html + '\n' + perfectOverrides;

fs.writeFileSync(file, html, 'utf8');
console.log("tilda_shop_page.html updated with absolute spans styling.");

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
