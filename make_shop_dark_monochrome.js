const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Applying dark theme and brand monochrome gradient to shop page...");

// 1. Inject custom CSS block in shop page style tags
const styleEndTag = '</style>';
const firstStyleIdx = html.indexOf(styleEndTag);
if (firstStyleIdx !== -1) {
    const shopDarkCSS = `
    /* --- BRAND MONOCHROME DARK THEME OVERRIDES --- */
    body, #allrecords, .t-rec { 
        background: linear-gradient(90deg, #0d0e11 0%, #20242D 55%, #4c5363 100%) !important; 
        color: #FFFFFF !important; 
    }
    h1, h2, h3, h4, h5, h6, p, span, div, li, label { 
        color: #FFFFFF !important; 
    }
    .text-neutral-500, .text-neutral-600, .text-neutral-400, span.text-neutral-500, span.text-neutral-600, p.text-neutral-600, p.text-neutral-500 {
        color: rgba(255, 255, 255, 0.6) !important;
    }
    a:not(.bg-brandgold) { 
        color: #FFFFFF !important; 
    }
    a:not(.bg-brandgold):hover { 
        color: #E2E5E9 !important; 
    }
    
    /* Header dynamic styles protection */
    header {
        background-color: transparent !important;
        border-color: transparent !important;
    }
    header.header-dark {
        background-color: rgba(13, 17, 23, 0.85) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    }
    header a, header button, header nav ul li a {
        color: rgba(255, 255, 255, 0.85) !important;
    }
    header a:hover, header button:hover, header nav ul li a:hover {
        color: #FFFFFF !important;
    }
    #logo-blur-light {
        display: none !important;
    }
    
    /* Input and Select elements */
    input, textarea, select {
        background-color: rgba(13, 17, 23, 0.6) !important;
        color: #FFFFFF !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
    }
    input::placeholder, textarea::placeholder {
        color: rgba(255, 255, 255, 0.4) !important;
    }
    
    /* Subscription form radio selector cards */
    form#subscription-form label {
        background-color: rgba(19, 21, 26, 0.45) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        color: #FFFFFF !important;
        transition: all 0.3s ease !important;
    }
    form#subscription-form label:hover {
        background-color: rgba(26, 28, 34, 0.65) !important;
        border-color: rgba(255, 255, 255, 0.25) !important;
    }
    
    /* Summary calculation box */
    .bg-transparent.border.border-black\\/20 {
        background-color: rgba(19, 21, 26, 0.4) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        color: #FFFFFF !important;
    }
    
    /* Primary checkout button */
    #lv-open-modal-btn {
        background: linear-gradient(90deg, #FFFFFF 0%, #D8DCE3 50%, #FFFFFF 100%) !important;
        color: #0D0E11 !important;
        border: none !important;
        border-radius: 4px !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
    }
    #lv-open-modal-btn:hover {
        filter: brightness(0.92) !important;
    }
    
    /* Dynamic title text gradients */
    .gradient-text-vertical {
        background: linear-gradient(90deg, #FFFFFF 0%, #7E8694 25%, #F0F2F5 50%, #4C5363 75%, #FFFFFF 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
    }
    
    /* Checklist border in product details */
    .border-black\\/10 {
        border-color: rgba(255, 255, 255, 0.08) !important;
    }
    
    /* Checkout Modal styling */
    #checkout-modal .bg-white, #checkout-modal div.bg-white {
        background-color: #13151A !important;
        color: #FFFFFF !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
    #checkout-modal h2, #checkout-modal h3, #checkout-modal p, #checkout-modal label {
        color: #FFFFFF !important;
    }
    #checkout-modal input {
        background-color: rgba(13, 17, 23, 0.6) !important;
        color: #FFFFFF !important;
        border-color: rgba(255, 255, 255, 0.15) !important;
    }
    #checkout-modal button[type="submit"] {
        background: linear-gradient(90deg, #FFFFFF 0%, #D8DCE3 50%, #FFFFFF 100%) !important;
        color: #0D0E11 !important;
        font-weight: bold !important;
    }
    `;
    html = html.substring(0, firstStyleIdx + 8) + `\n    <style>${shopDarkCSS}</style>` + html.substring(firstStyleIdx + 8);
    console.log("Custom CSS overrides block injected in shop page!");
}

// 2. Remove inline gold styles and colors from HTML tags
html = html.replace(/style="color:#FFD700!important"/g, 'style="color:#FFFFFF!important"');
html = html.replace(/style="color:#FFD700"/g, 'style="color:#FFFFFF"');
html = html.replace(/style="color:#111827!important"/g, 'style="color:#FFFFFF!important"');
html = html.replace(/color:#FFD700/g, 'color:#E2E5E9');
html = html.replace(/bg-brandgold/g, 'bg-white');

fs.writeFileSync(file, html, 'utf8');
console.log("Shop page modifications complete!");

// 3. Create the artifact approved_shop_page_code.md
const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), переведенную на темный металлический градиент бренда, с серебряной металлической кнопкой заказа и оформлением карточек в виде темного стекла.

\`\`\`html
${html}
\`\`\`
`;
fs.writeFileSync(destPath, mdContent, 'utf8');
console.log("Shop page artifact created!");

// 4. Sync and push to GitHub
const { execSync } = require('child_process');
try {
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Changes pushed to GitHub successfully!");
} catch (e) {
    console.error("Error during sync and push:", e.message);
}
