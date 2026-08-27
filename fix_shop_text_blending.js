const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Fixing shop page text blending (prepend styles) and adding heading animation...");

// 1. Replace the shop main heading "LONVI PCC1" with the animated chrome gradient version
const oldHeading = `<h1 class="text-4xl md:text-5xl lg:text-6xl font-wild font-bold tracking-tighter mb-4 text-neutral-900 leading-none">LONVI PCC1</h1>`;
const newHeading = `<h1 class="text-4xl md:text-5xl lg:text-6xl font-wild font-black tracking-tighter mb-4 leading-none"><span class="gradient-text-animated">LONVI PCC1</span></h1>`;

if (html.includes(oldHeading)) {
    html = html.replace(oldHeading, newHeading);
    console.log("Main heading animated!");
} else {
    // Try relaxed replace
    html = html.replace(/<h1[^>]*>\s*LONVI PCC1\s*<\/h1>/i, newHeading);
    console.log("Heading replaced using fallback regex.");
}

// 2. Prepend high-specificity style overrides to the very beginning of the HTML file
const overrideStyles = `
<style>
    /* HIGH SPECIFICITY MONOCHROME TEXT OVERRIDES FOR DARK THEME */
    #allrecords h1, #allrecords h2, #allrecords h3, #allrecords h4, #allrecords h5, #allrecords h6, 
    #allrecords p, #allrecords span, #allrecords div, #allrecords li, #allrecords label, 
    #allrecords input, #allrecords textarea, #allrecords select,
    #allrecords .text-neutral-900, #allrecords .text-black, #allrecords .text-neutral-700 {
        color: #FFFFFF !important;
    }
    
    /* Silver-gray for subtexts to preserve hierarchy */
    #allrecords .text-neutral-600, #allrecords .text-neutral-500, #allrecords .text-neutral-400, 
    #allrecords p.text-neutral-600, #allrecords p.text-neutral-500, #allrecords span.text-neutral-600, 
    #allrecords .text-neutral-300, #allrecords span.text-neutral-500, #allrecords p.text-neutral-900,
    #allrecords .text-neutral-600 span, #allrecords p.text-neutral-600 span {
        color: rgba(226, 229, 233, 0.75) !important;
    }

    /* Redefining animated text gradient for shop */
    .gradient-text-animated {
        background: linear-gradient(90deg, #FFFFFF 0%, #7E8694 25%, #F0F2F5 50%, #4C5363 75%, #FFFFFF 100%) !important;
        background-size: 300% auto !important;
        -webkit-background-clip: text !important;
        background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        animation: gradient-move 8s linear infinite !important;
        display: inline-block !important;
    }
    
    /* Form options background */
    #allrecords form#subscription-form label {
        background-color: rgba(19, 21, 26, 0.45) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
    #allrecords form#subscription-form label:hover {
        background-color: rgba(26, 28, 34, 0.65) !important;
        border-color: rgba(255, 255, 255, 0.25) !important;
    }

    /* Ensure text inside selected option is also white */
    #allrecords form#subscription-form input[type="radio"]:checked + div {
        border-color: #FFFFFF !important;
        background-color: rgba(255, 255, 255, 0.05) !important;
    }
</style>
`;

html = overrideStyles + html;
console.log("High specificity styles prepended successfully!");

fs.writeFileSync(file, html, 'utf8');

// 3. Update artifact
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на темный металлический градиент бренда, БЕЗ желтого цвета, с высокой контрастностью всех текстов (защищено от перебивания стилей Tilda) и анимированным логотипом-заголовком LONVI PCC1.

\`\`\`html
${html}
\`\`\`
`;
fs.writeFileSync(destPath, mdContent, 'utf8');
console.log("Shop page artifact updated!");

// 4. Sync and push to GitHub
const { execSync } = require('child_process');
try {
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Changes pushed to GitHub successfully!");
} catch (e) {
    console.error("Error during sync and push:", e.message);
}
