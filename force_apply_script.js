const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Replacing script block in tilda_shop_page.html via markers...");

const startMarker = '// Lightbox logic';
const endMarker = '// Options Selection Logic';

const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
    const newScriptSection = `// Lightbox logic
            const lightbox = document.getElementById('lv-lightbox');
            const lightboxImg = document.getElementById('lv-lightbox-img');
            
            if (lightbox && lightboxImg) {
                document.addEventListener('click', function(e) {
                    const slideImg = e.target.closest('.slide-item img');
                    if (slideImg) {
                        lightboxImg.src = slideImg.src;
                        lightbox.classList.remove('hidden');
                        lightbox.classList.add('flex');
                        void lightbox.offsetWidth;
                        lightbox.classList.remove('opacity-0');
                        lightboxImg.classList.remove('scale-95');
                        lightboxImg.classList.add('scale-100');
                        document.body.style.overflow = 'hidden';
                    }
                });
                
                lightbox.addEventListener('click', function() {
                    lightbox.classList.add('opacity-0');
                    lightboxImg.classList.remove('scale-100');
                    lightboxImg.classList.add('scale-95');
                    setTimeout(() => {
                        lightbox.classList.add('hidden');
                        lightbox.classList.remove('flex');
                        document.body.style.overflow = '';
                    }, 300);
                });
            }
     

            // Phone mask logic
            const phoneInput = document.getElementById('lv-phone');
            if (phoneInput) {
                phoneInput.addEventListener('input', function (e) {
                    let val = e.target.value.replace(/\\D/g, '');
                    if (!val) return e.target.value = '';
                    if (val[0] === '7' || val[0] === '8') val = val.substring(1);
                    
                    let formatted = '+7';
                    if (val.length > 0) formatted += ' (' + val.substring(0, 3);
                    if (val.length >= 4) formatted += ') ' + val.substring(3, 6);
                    if (val.length >= 7) formatted += '-' + val.substring(6, 8);
                    if (val.length >= 9) formatted += '-' + val.substring(8, 10);
                    
                    e.target.value = formatted;
                });
            }
     
            // Slideshow Logic
            const slides = document.querySelectorAll('.slide-item');
            const dots = document.querySelectorAll('.slide-dot');
            const video = document.getElementById('slideshow-video');
            let currentSlide = 0;
            let slideInterval;

            function showSlide(index) {
                if (!slides.length) return;
                
                // Stop video if leaving video slide
                if (currentSlide === 2 && video) {
                    video.pause();
                }

                currentSlide = index;

                slides.forEach((slide, i) => {
                    if (i === index) {
                        slide.classList.remove('opacity-0', 'scale-95', 'z-0');
                        slide.classList.add('opacity-100', 'scale-100', 'z-10');
                        
                        // Play video if entering video slide
                        if (i === 2 && video) {
                            video.currentTime = 0;
                            video.play().catch(e => console.log('Video autoplay blocked:', e));
                        }
                    } else {
                        slide.classList.remove('opacity-100', 'scale-100', 'z-10');
                        slide.classList.add('opacity-0', 'scale-95', 'z-0');
                    }
                });

                // Update dots
                if (dots.length) {
                    dots.forEach((dot, i) => {
                        if (i === index) {
                            dot.classList.remove('bg-black/20');
                            dot.classList.add('bg-black', 'scale-125');
                        } else {
                            dot.classList.remove('bg-black', 'scale-125');
                            dot.classList.add('bg-black/20');
                        }
                    });
                }
            }

            window.goToSlide = function(index) {
                showSlide(index);
                resetInterval();
            };

            function nextSlide() {
                const next = (currentSlide + 1) % slides.length;
                showSlide(next);
            }

            function startInterval() {
                slideInterval = setInterval(nextSlide, 5000);
            }

            function resetInterval() {
                clearInterval(slideInterval);
                startInterval();
            }

            if (slides.length) {
                startInterval();
            }
            
            `;
    
    html = html.substring(0, startIdx) + newScriptSection + '\n            ' + html.substring(endIdx);
    console.log("SUCCESS: Script block replaced between markers!");
} else {
    console.log("FAILURE: Markers not found!");
}

fs.writeFileSync(file, html, 'utf8');
console.log("tilda_shop_page.html saved!");

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
