const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Fixing [ ИНФОРМАЦИЯ ] badge and FAQ accordion hover styling...");

// 1. Fix [ ИНФОРМАЦИЯ ] badge text color
const oldBadge = `class="text-xs md:text-sm font-bold tracking-[0.3em] uppercase inline-block bg-neutral-900 text-brandgold px-4 py-2 rounded-sm border border-neutral-200 break-words">[ ИНФОРМАЦИЯ ]`;
const newBadge = `class="text-xs md:text-sm font-bold tracking-[0.3em] uppercase inline-block bg-neutral-900 text-white px-4 py-2 rounded-sm border border-neutral-200 break-words" style="color: #FFFFFF !important;">[ ИНФОРМАЦИЯ ]`;

if (html.includes(oldBadge)) {
    html = html.replace(oldBadge, newBadge);
    console.log("[ ИНФОРМАЦИЯ ] badge fixed.");
} else {
    // Try relaxed regex replacement
    html = html.replace(/text-brandgold([^>]*>\[\s*ИНФОРМАЦИЯ\s*\])/g, 'text-white$1');
    console.log("[ ИНФОРМАЦИЯ ] badge fallback replacement run.");
}

// 2. Append FAQ Hover and Badge color override styles at the very end of the file in a new style block
const faqHoverStyles = `
<!-- FAQ ACCORDION HOVER TEXT AND ICON COLOR OVERRIDES -->
<style>
    /* Force text and icon to turn white when accordion is hovered on white background */
    #allrecords details.group:hover summary span,
    #allrecords details.group:hover summary h3,
    #allrecords details.group:hover summary p,
    #allrecords details.group:hover summary div {
        color: #FFFFFF !important;
    }
    
    #allrecords details.group:hover summary svg,
    #allrecords details.group:hover summary svg path,
    #allrecords details.group:hover summary svg line,
    #allrecords details.group:hover summary svg circle {
        color: #FFFFFF !important;
        stroke: #FFFFFF !important;
        fill: none !important;
    }
    
    /* Plus icon default state styling */
    #allrecords details.group summary svg {
        color: #0A0A0A !important;
        stroke: #0A0A0A !important;
        fill: none !important;
        transition: stroke 0.3s ease, color 0.3s ease !important;
    }
</style>
`;

html = html + '\n' + faqHoverStyles;

fs.writeFileSync(file, html, 'utf8');
console.log("FAQ hover styles appended.");

// 3. Update artifact approved_shop_page_code.md
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на премиальную светлую тему с белым/светло-серым фоном (как просил клиент), БЕЗ желтого цвета, с высокой контрастностью всех текстов, черной кнопкой заказа, оригинальной хромированной анимацией заголовка LONVI PCC1, металлическим градиентом для блока описания качества, а также исправленным ховером для карточек FAQ (текст и иконка корректно переходят в белый цвет при наведении).

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
