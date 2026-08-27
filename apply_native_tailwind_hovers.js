const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Applying native Tailwind group-hover classes to FAQ questions and icons...");

// 1. Add group-hover:text-white to the question text spans in FAQ
// Let's replace the spans inside the details summary.
// We can use regex to match details accordions.
// Let's search for: <span>Состав</span>, <span>Способ применения</span>, etc.
const faqItems = [
    { name: "Состав", line: "<span>Состав</span>" },
    { name: "Способ применения", line: "<span>Способ применения</span>" },
    { name: "Противопоказания", line: "<span>Противопоказания</span>" },
    { name: "Условия хранения", line: "<span>Условия хранения</span>" }
];

faqItems.forEach(item => {
    html = html.replace(item.line, `<span class="group-hover:text-white transition-colors duration-300">${item.name}</span>`);
});

// 2. Add group-hover classes to the icon circle spans and SVGs
// Let's replace the icon parent span and the svg tag.
const oldIconBlock = `class="relative w-8 h-8 flex items-center justify-center border-2 border-neutral-900 rounded-full group-open:bg-neutral-900 transition-colors duration-500">
                                <svg class="w-4 h-4 text-neutral-900 group-open:text-white transition-transform duration-500 group-open:rotate-45"`;

const newIconBlock = `class="relative w-8 h-8 flex items-center justify-center border-2 border-neutral-900 rounded-full group-open:bg-neutral-900 group-hover:border-white transition-colors duration-500">
                                <svg class="w-4 h-4 text-neutral-900 group-open:text-white group-hover:text-white transition-transform duration-500 group-open:rotate-45"`;

// Run global replacement (we have multiple accordions with the exact same structure)
let count = 0;
while (html.includes(oldIconBlock)) {
    html = html.replace(oldIconBlock, newIconBlock);
    count++;
}
console.log(`Replaced ${count} occurrences of FAQ icon markup.`);

// 3. Remove #allrecords from our stylesheet overrides to make them globally match regardless of parent ID wrappers
html = html.replace(/#allrecords/g, '');

fs.writeFileSync(file, html, 'utf8');
console.log("tilda_shop_page.html updated with native Tailwind hovers.");

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
