const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

const taskPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\task.md';

console.log("Updating task.md...");
let taskContent = fs.readFileSync(taskPath, 'utf8');
taskContent = taskContent.replace(/- \[x\] Modify `tilda_shop_page.html`/g, '- [/] Modify `tilda_shop_page.html`');
taskContent = taskContent.replace(/- \[x\] Add the rotating circular/g, '- [/] Add the rotating circular');
fs.writeFileSync(taskPath, taskContent, 'utf8');

// 1. Remove the radial gradient from the left column wrapper
console.log("Removing inline radial gradient from left column wrapper...");
const leftColumnWithGradient = /<!-- Left side \(gallery with rotating lines\) -->\s*<div class="relative w-full flex flex-col items-center justify-center p-4 md:p-8 z-20 overflow-visible" style="background: radial-gradient\(ellipse 90% 90% at 20% 50%, rgba\(13, 14, 17, 0.98\) 0%, rgba\(26, 28, 34, 0.85\) 45%, rgba\(47, 53, 66, 0.45\) 70%, rgba\(245, 245, 247, 0\) 100%\);/i;

const cleanLeftColumn = `<!-- Left side (gallery with rotating lines) -->
                    <div class="relative w-full flex flex-col items-center justify-center p-4 md:p-8 z-20 overflow-visible"`;

html = html.replace(leftColumnWithGradient, cleanLeftColumn);

// 2. Add the absolute spot gradient inside <main id="main-content"...> starting at left-0
console.log("Adding absolute viewport-aligned spot gradient...");
const mainRegex = /<main\s+id="main-content"\s+class="min-h-screen\s+bg-\[#F5F5F7\]\s+text-neutral-900">\s*<div\s+class="pt-20\s+lg:pt-32\s+flex\s+flex-col\s+pb-16">/i;

const newMainWrapper = `<main id="main-content" class="min-h-screen bg-[#F5F5F7] text-neutral-900 relative overflow-hidden">
        <!-- Deep Metallic Spot Gradient Background (stretches to left screen edge, aligned with gallery vertical position) -->
        <div class="absolute top-[80px] lg:top-[128px] left-0 w-full md:w-[65%] lg:w-[60%] h-[550px] sm:h-[650px] md:h-[700px] lg:h-[750px] pointer-events-none z-0" style="background: radial-gradient(circle 500px at 32% 50%, rgba(13, 14, 17, 0.98) 0%, rgba(26, 28, 34, 0.85) 45%, rgba(47, 53, 66, 0.45) 70%, rgba(245, 245, 247, 0) 100%);"></div>
        <div class="pt-20 lg:pt-32 flex flex-col pb-16 relative z-10">`;

html = html.replace(mainRegex, newMainWrapper);
console.log("Viewport-aligned spot gradient applied.");

fs.writeFileSync(file, html, 'utf8');
console.log("tilda_shop_page.html saved successfully.");

// 3. Update task.md
taskContent = fs.readFileSync(taskPath, 'utf8');
taskContent = taskContent.replace(/- \[\/\] Modify `tilda_shop_page.html`/g, '- [x] Modify `tilda_shop_page.html`');
taskContent = taskContent.replace(/- \[\/\] Add the rotating circular/g, '- [x] Add the rotating circular');
fs.writeFileSync(taskPath, taskContent, 'utf8');
console.log("task.md updated.");

// Update approved_shop_page_code.md
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
