const fs = require('fs');
const { execSync } = require('child_process');

console.log("Restoring shop page to a beautiful light monochrome theme...");

try {
    // 1. Get the original tilda_shop_page.html content from commit 8c07cda
    const originalShopContent = execSync('git show 8c07cda:shop.html', { maxBuffer: 10 * 1024 * 1024, encoding: 'utf8' });
    
    let html = originalShopContent;

    // 2. Modify Tailwind config for monochrome theme (black buttons instead of yellow)
    html = html.replace(/brandgold:\s*'#FFD700'/g, "brandgold: '#0D0E11'");
    html = html.replace(/brandgoldHover:\s*'#F2C800'/g, "brandgoldHover: '#20242D'");

    // 3. Add custom styles block for premium dark metallic headings and buttons
    const customStyleBlock = `
<style>
    /* --- PREMIUM LIGHT MONOCHROME SHOP STYLE --- */
    body, #allrecords, .t-rec {
        background-color: #F5F5F7 !important;
        color: #111827 !important;
    }
    
    /* Dark metallic animated text gradient for headings on light background */
    .gradient-text-animated {
        background: linear-gradient(90deg, #0D0E11 0%, #4C5363 50%, #0D0E11 100%) !important;
        background-size: 200% auto !important;
        -webkit-background-clip: text !important;
        background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        animation: shine 4s linear infinite !important;
        display: inline-block !important;
    }
    @keyframes shine {
        to { background-position: 200% center; }
    }

    /* Force primary button to be dark charcoal with white text */
    #lv-open-modal-btn, a.bg-brandgold, button.bg-brandgold {
        background-color: #0D0E11 !important;
        color: #FFFFFF !important;
        border-color: #0D0E11 !important;
        transition: all 0.3s ease !important;
    }
    #lv-open-modal-btn:hover, a.bg-brandgold:hover, button.bg-brandgold:hover {
        background-color: #20242D !important;
        color: #FFFFFF !important;
        border-color: #20242D !important;
    }

    /* Badge styling: dark badges instead of yellow */
    .text-brandgold, span.text-brandgold {
        color: #0D0E11 !important;
    }
    
    /* Link hover colors */
    a:not(.bg-brandgold):hover {
        color: #4C5363 !important;
    }
    
    /* Clean custom package options */
    form#subscription-form label {
        border-color: rgba(0, 0, 0, 0.1) !important;
    }
    form#subscription-form label:hover {
        border-color: rgba(0, 0, 0, 0.3) !important;
    }
    form#subscription-form input[type="radio"]:checked + div {
        border-color: #0D0E11 !important;
    }
</style>
`;

    // Prepend overrides block at the very beginning of the document
    html = customStyleBlock + html;

    // 4. Animate the main LONVI PCC1 heading on the shop page
    const oldHeading = `<h1 class="text-4xl md:text-5xl lg:text-6xl font-wild font-bold tracking-tighter mb-4 text-neutral-900 leading-none">LONVI PCC1</h1>`;
    const newHeading = `<h1 class="text-4xl md:text-5xl lg:text-6xl font-wild font-black tracking-tighter mb-4 leading-none"><span class="gradient-text-animated">LONVI PCC1</span></h1>`;
    
    if (html.includes(oldHeading)) {
        html = html.replace(oldHeading, newHeading);
    } else {
        html = html.replace(/<h1[^>]*>\s*LONVI PCC1\s*<\/h1>/i, newHeading);
    }

    // 5. Replace inline yellow styles with neutral/monochrome ones
    html = html.replace(/style="color:#FFD700!important"/g, 'style="color:#0D0E11!important"');
    html = html.replace(/style="color:#FFD700"/g, 'style="color:#0D0E11"');
    html = html.replace(/#FFD700/g, '#0D0E11');
    html = html.replace(/#FFE866/g, '#20242D');
    html = html.replace(/#F2C800/g, '#20242D');

    // 6. Write back to file
    const shopPagePath = '../lonvi-redesign/tilda_shop_page.html';
    fs.writeFileSync(shopPagePath, html, 'utf8');
    console.log("tilda_shop_page.html written successfully.");

    // 7. Write to artifact approved_shop_page_code.md
    const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_shop_page_code.md';
    const mdContent = `# Approved Shop Page Code (Одобренный код страницы магазина)

Этот код содержит финальную версию страницы магазина (shop), полностью переведенную на премиальную светлую тему с белым/светло-серым фоном (как просил клиент), БЕЗ желтого цвета (все желтые элементы заменены на глубокий черный и стальной), с черной контрастной кнопкой заказа и анимированным заголовком LONVI PCC1.

\`\`\`html
${html}
\`\`\`
`;
    fs.writeFileSync(destPath, mdContent, 'utf8');
    console.log("approved_shop_page_code.md artifact written.");

    // 8. Sync and push to GitHub
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Changes successfully pushed to GitHub!");

} catch (e) {
    console.error("Error during light monochrome shop restore:", e.message);
}
