const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Applying final robust checkmark JS and cleaning styling overrides...");

// 1. Remove any previous DOMContentLoaded script blocks that we added at the end
const scriptRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded',[\s\S]*?<\/script>/g;
html = html.replace(scriptRegex, '');

// 2. Append the new robust readyState-safe script at the end
const robustScript = `
<!-- ROBUST RADIO BUTTON AND CHECKMARK STATE CONTROLLER -->
<script>
(function() {
    function initTariffRadio() {
        const shopForm = document.getElementById('shop-form');
        if (!shopForm) return;
        
        console.log("Initializing shop tariff radio checkmarks...");
        
        const updateTariffUI = () => {
            shopForm.querySelectorAll('label').forEach(label => {
                const radio = label.querySelector('input[type="radio"]');
                const indicatorCircle = label.querySelector('.w-5.h-5');
                const checkmarkSvg = label.querySelector('svg');
                
                if (radio && indicatorCircle && checkmarkSvg) {
                    if (radio.checked) {
                        // Select state (Dark Charcoal background, white checkmark, dark border)
                        indicatorCircle.style.setProperty('background-color', '#0D0E11', 'important');
                        indicatorCircle.style.setProperty('border-color', '#0D0E11', 'important');
                        checkmarkSvg.style.setProperty('opacity', '1', 'important');
                        checkmarkSvg.style.setProperty('color', '#FFFFFF', 'important');
                        label.style.setProperty('border-color', '#0D0E11', 'important');
                        label.style.setProperty('background-color', '#F5F5F7', 'important');
                    } else {
                        // Unselect state (transparent background, hidden checkmark, neutral border)
                        indicatorCircle.style.setProperty('background-color', 'transparent', 'important');
                        indicatorCircle.style.setProperty('border-color', '#D1D5DB', 'important');
                        checkmarkSvg.style.setProperty('opacity', '0', 'important');
                        label.style.setProperty('border-color', '#E5E7EB', 'important');
                        label.style.setProperty('background-color', '#FFFFFF', 'important');
                    }
                }
            });
        };

        // Listen for change events
        shopForm.addEventListener('change', updateTariffUI);
        
        // Listen for click events on the labels to ensure immediate change propagation
        shopForm.querySelectorAll('label').forEach(label => {
            label.addEventListener('click', () => {
                setTimeout(updateTariffUI, 10);
            });
        });

        // Run updates
        updateTariffUI();
        
        // Multi-stage timeout checks to handle dynamic CDN/Tilda load delays
        setTimeout(updateTariffUI, 100);
        setTimeout(updateTariffUI, 500);
        setTimeout(updateTariffUI, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTariffRadio);
    } else {
        initTariffRadio();
    }
})();
</script>
`;

html = html + '\n' + robustScript;

fs.writeFileSync(file, html, 'utf8');
console.log("tilda_shop_page.html updated with robust JS script.");

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
