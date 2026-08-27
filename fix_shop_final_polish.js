const fs = require('fs');
const { execSync } = require('child_process');

const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Applying final polish to shop page (FAQ accordion light hover, JS radio checkmarks, and robust heading animation)...");

// 1. Append the ultimate CSS overrides at the end of the file
const finalPolishStyles = `
<!-- ULTIMATE DESIGN CORRECTIONS AND CONTRAST FIXED -->
<style>
    /* Force exact chrome white-silver animated text gradient */
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

    /* Light Theme FAQ Hover - Keep it light and elegant, never turn black */
    #allrecords details.group:hover {
        background-color: #EBF0F5 !important;
        border-color: #9CA3AF !important;
    }
    
    #allrecords details.group:hover summary span,
    #allrecords details.group:hover summary h3,
    #allrecords details.group:hover summary p,
    #allrecords details.group:hover summary div {
        color: #0D0E11 !important;
    }
    
    /* Plus/Close icon default and hover state stroke colors */
    #allrecords details.group summary svg {
        color: #0D0E11 !important;
        stroke: #0D0E11 !important;
        fill: none !important;
        transition: all 0.3s ease !important;
    }
    
    #allrecords details.group:hover summary svg {
        color: #0D0E11 !important;
        stroke: #0D0E11 !important;
    }

    /* FAQ open state: keep card light, but make active icon black circle with white cross */
    #allrecords details.group[open] {
        background-color: #FFFFFF !important;
        border-color: #0D0E11 !important;
    }
    
    #allrecords details.group[open] summary span.relative {
        background-color: #0D0E11 !important;
        border-color: #0D0E11 !important;
    }
    
    #allrecords details[open] summary svg,
    #allrecords details[open] summary svg path,
    #allrecords details[open] summary svg line {
        color: #FFFFFF !important;
        stroke: #FFFFFF !important;
    }
    
    /* Ensure input elements are readable */
    #allrecords input[type="text"], #allrecords input[type="tel"], #allrecords input[type="email"] {
        background-color: #FFFFFF !important;
        color: #0D0E11 !important;
        border: 1px solid #D1D5DB !important;
    }
</style>
`;

// 2. Append the JS script for tariff selection radio checkmarks at the bottom of the file
const checkmarkJSScript = `
<script>
document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Tariff radio buttons styling helper
    const shopForm = document.getElementById('shop-form');
    if (shopForm) {
        const updateTariffUI = () => {
            shopForm.querySelectorAll('label').forEach(label => {
                const radio = label.querySelector('input[type="radio"]');
                const indicatorCircle = label.querySelector('.w-5.h-5');
                const checkmarkSvg = label.querySelector('svg');
                
                if (radio && indicatorCircle && checkmarkSvg) {
                    if (radio.checked) {
                        indicatorCircle.style.setProperty('background-color', '#0D0E11', 'important');
                        indicatorCircle.style.setProperty('border-color', '#0D0E11', 'important');
                        checkmarkSvg.style.setProperty('opacity', '1', 'important');
                        checkmarkSvg.style.setProperty('color', '#FFFFFF', 'important');
                        label.style.setProperty('border-color', '#0D0E11', 'important');
                        label.style.setProperty('background-color', '#F3F4F6', 'important');
                    } else {
                        indicatorCircle.style.setProperty('background-color', 'transparent', 'important');
                        indicatorCircle.style.setProperty('border-color', '#D1D5DB', 'important');
                        checkmarkSvg.style.setProperty('opacity', '0', 'important');
                        label.style.setProperty('border-color', '#E5E7EB', 'important');
                        label.style.setProperty('background-color', '#FFFFFF', 'important');
                    }
                }
            });
        };

        // Run initially and on change
        shopForm.addEventListener('change', updateTariffUI);
        updateTariffUI();
        
        // Extra check because Tilda wrapper might trigger initial click events
        setTimeout(updateTariffUI, 200);
        setTimeout(updateTariffUI, 1000);
    }
});
</script>
`;

html = html + '\n' + finalPolishStyles + '\n' + checkmarkJSScript;

fs.writeFileSync(file, html, 'utf8');
console.log("tilda_shop_page.html updated with final polish changes.");

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
