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

// 1. Fix the broken CSS style tag at the top of the file
console.log("Fixing broken keyframes CSS at the top of the file...");
const brokenCSS = `<!-- LONVI REDESIGN: SQUARE METALLIC SLIDESHOW ACTIVE -->
<style>
    
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
</style>`;

const fixedCSS = `<!-- LONVI REDESIGN: SQUARE METALLIC SLIDESHOW ACTIVE -->
<style>
    @keyframes gradient-text-animated {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
</style>`;

html = html.replace(brokenCSS, fixedCSS);
console.log("CSS Syntax fixed at the top.");

// 2. Modify the HTML block to use the smooth radial gradient wrapper and white dashed borders
console.log("Updating HTML block to smooth radial gradient wrapper...");
const galleryRegex = /<!-- Left side \(gallery with rotating lines\) -->[\s\S]*?<!-- Right side \(content\) -->/i;

const newGalleryHTML = `<!-- Left side (gallery with rotating lines) -->
                    <div class="relative w-full flex flex-col items-center justify-center p-6 md:p-12 z-20 overflow-visible" style="background: radial-gradient(circle at center, rgba(13, 14, 17, 0.98) 0%, rgba(26, 28, 34, 0.8) 45%, rgba(245, 245, 247, 0) 72%);">
                        <!-- Outer rotating border -->
                        <div class="absolute inset-2 md:inset-4 border-2 border-white/25 rounded-full z-0 opacity-80 border-dashed animate-spin-slow pointer-events-none" style="will-change: transform; backface-visibility: hidden; transform-style: preserve-3d;"></div>
                        <!-- Inner rotating border (reverse) -->
                        <div class="absolute inset-8 md:inset-12 border border-white/15 border-dashed rounded-full z-0 opacity-60 animate-spin-slow-reverse pointer-events-none" style="will-change: transform; backface-visibility: hidden; transform-style: preserve-3d;"></div>
                        
                        <!-- Main Gallery Container (Original White Gallery) -->
                        <div class="relative z-10 w-full overflow-hidden bg-white flex flex-col rounded-none border border-black/20 shadow-2xl transition-all duration-300">
                            <!-- Main Image Viewport -->
                            <div class="relative z-10 w-full aspect-square lg:aspect-[4/3] flex items-center justify-center p-4 md:p-8">
                                <img id="main-gallery-img" src="https://cdn.jsdelivr.net/gh/matilda081133-sketch/lonvi@main/assets/product-box-open.jpg" alt="LONVI PCC1 Box" class="w-full h-full object-contain drop-shadow-xl transition-opacity duration-300 cursor-zoom-in">
                                <video poster="https://cdn.jsdelivr.net/gh/matilda081133-sketch/lonvi@main/assets/product-box-open.jpg" id="main-gallery-video" src="https://cdn.jsdelivr.net/gh/matilda081133-sketch/lonvi@main/assets/product-video-1.mp4" class="w-full max-w-full h-auto max-h-full object-contain shadow-2xl rounded-none hidden" poster="./assets/product-box-leaves.jpg" loop muted playsinline autoplay controls></video>
                            </div>
                            <!-- Gallery Thumbnails Footer -->
                            <div class="relative z-10 flex justify-center gap-3 py-4 md:py-6 overflow-x-auto hide-scrollbar px-4 border-t border-black/5">
                                <button data-slide="0" data-type="image" data-src="https://cdn.jsdelivr.net/gh/matilda081133-sketch/lonvi@main/assets/product-box-open.jpg" class="gallery-thumb flex-shrink-0 relative w-14 h-14 md:w-20 md:h-20 border-2 transition-all overflow-hidden border-brandgold">
                                    <img src="https://cdn.jsdelivr.net/gh/matilda081133-sketch/lonvi@main/assets/product-box-open.jpg" alt="Thumbnail 0" class="w-full h-full object-cover">
                                </button>
                                
                                <button data-slide="1" data-type="image" data-src="https://cdn.jsdelivr.net/gh/matilda081133-sketch/lonvi@main/assets/gallery-leaves.jpg" class="gallery-thumb flex-shrink-0 relative w-14 h-14 md:w-20 md:h-20 border-2 transition-all overflow-hidden border-black/20 hover:border-brandgold/50">
                                    <img src="https://cdn.jsdelivr.net/gh/matilda081133-sketch/lonvi@main/assets/gallery-leaves.jpg" alt="Thumbnail 1" class="w-full h-full object-cover">
                                </button>
                                <button data-slide="2" data-type="video" data-src="https://cdn.jsdelivr.net/gh/matilda081133-sketch/lonvi@main/assets/product-video-1.mp4" class="gallery-thumb flex-shrink-0 relative w-14 h-14 md:w-20 md:h-20 border-2 transition-all overflow-hidden border-black/20 hover:border-brandgold/50">
                                    <video poster="https://cdn.jsdelivr.net/gh/matilda081133-sketch/lonvi@main/assets/product-box-open.jpg" src="https://cdn.jsdelivr.net/gh/matilda081133-sketch/lonvi@main/assets/product-video-1.mp4" class="w-full h-full object-cover" poster="./assets/product-box-leaves.jpg" muted></video>
                                    <div class="absolute inset-0 bg-[#E5E5E5]/40 flex items-center justify-center">
                                        <svg class="w-6 h-6 text-neutral-900" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- Right side (content) -->`;

html = html.replace(galleryRegex, newGalleryHTML);
console.log("Gallery HTML updated with smooth radial gradient.");

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
