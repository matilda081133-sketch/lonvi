const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Applying native Tailwind hovers to FAQ elements using regular expressions...");

// 1. Match the icon container span and svg tag, and insert native Tailwind hovers
const spanRegex = /class="relative w-8 h-8 flex items-center justify-center border-2 border-neutral-900 rounded-full group-open:bg-neutral-900 transition-colors duration-500"\s*>\s*<svg class="w-4 h-4 text-neutral-900 group-open:text-white transition-transform duration-500 group-open:rotate-45"/gi;

const newSpanSvg = `class="relative w-8 h-8 flex items-center justify-center border-2 border-neutral-900 rounded-full group-open:bg-neutral-900 group-hover:border-white transition-colors duration-500">
                                <svg class="w-4 h-4 text-neutral-900 group-open:text-white group-hover:text-white transition-transform duration-500 group-open:rotate-45"`;

// Let's print matches first to see if it matches
const matches = html.match(spanRegex);
console.log(`Found ${matches ? matches.length : 0} matches using spanRegex.`);

// Run replacement
html = html.replace(
    /class="relative w-8 h-8 flex items-center justify-center border-2 border-neutral-900 rounded-full group-open:bg-neutral-900 transition-colors duration-500"/g,
    'class="relative w-8 h-8 flex items-center justify-center border-2 border-neutral-900 rounded-full group-open:bg-neutral-900 group-hover:border-white transition-colors duration-500"'
);

html = html.replace(
    /class="w-4 h-4 text-neutral-900 group-open:text-white transition-transform duration-500 group-open:rotate-45"/g,
    'class="w-4 h-4 text-neutral-900 group-open:text-white group-hover:text-white transition-transform duration-500 group-open:rotate-45"'
);

fs.writeFileSync(file, html, 'utf8');
console.log("tilda_shop_page.html updated with regex.");

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
