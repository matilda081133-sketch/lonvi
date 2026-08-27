const fs = require('fs');
const { execSync } = require('child_process');

const gitDir = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\scratch\\github-lonvi';

const filesToUpdate = [
    'C:\\Users\\Honor\\.gemini\\antigravity-ide\\scratch\\lonvi-redesign\\tilda_main_page.html',
    'C:\\Users\\Honor\\ .gemini\\antigravity-ide\\scratch\\lonvi-redesign\\tilda_main_page.html',
    'C:\\Users\\Honor\\.gemini\\antigravity-ide\\scratch\\lonvi-redesign\\tilda_shop_page.html',
    'C:\\Users\\Honor\\ .gemini\\antigravity-ide\\scratch\\lonvi-redesign\\tilda_shop_page.html',
    'C:\\Users\\Honor\\.gemini\\antigravity-ide\\scratch\\github-lonvi\\tilda_shop_page.html',
    'C:\\Users\\Honor\\.gemini\\antigravity-ide\\scratch\\github-lonvi\\index.html'
];

filesToUpdate.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;

    if (file.includes('tilda_main_page.html') || file.includes('index.html')) {
        // Main page: Remove the click listener on cartShopBtn so it doesn't block the link navigation
        content = content.replace(
            /if\s*\(\s*cartShopBtn\s*\)\s*\{\s*cartShopBtn\.addEventListener\('click',\s*function\(\)\s*\{\s*toggleCart\(false\);\s*\}\);\s*\}/g,
            '/* Let the browser navigate naturally on main page */'
        );
    } else if (file.includes('tilda_shop_page.html') || file.includes('shop.html')) {
        // Shop page: Add the click listener to cartShopBtn to close the drawer (since they are already in the shop)
        const insertionPoint = "if(cartBtn && closeCartBtn && cartOverlay) {";
        if (content.includes(insertionPoint) && !content.includes('const cartShopBtn = document.getElementById(\'cart-shop-btn\');')) {
            const replacement = `const cartShopBtn = document.getElementById('cart-shop-btn');
            if(cartShopBtn) cartShopBtn.addEventListener('click', closeCart);
            
            if(cartBtn && closeCartBtn && cartOverlay) {`;
            content = content.replace(insertionPoint, replacement);
        }
    }

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated JS handlers in: ${file}`);
    } else {
        console.log(`No JS changes needed in: ${file}`);
    }
});

try {
    console.log("Running git operations...");
    execSync('git add *.html', { cwd: gitDir, stdio: 'inherit' });
    execSync('git commit -m "Fix cart-shop-btn handlers: let it navigate on main page, let it close drawer on shop page"', { cwd: gitDir, stdio: 'inherit' });
    execSync('git push', { cwd: gitDir, stdio: 'inherit' });
    console.log("Git push completed successfully!");
} catch (e) {
    console.error("Git failed:", e.message);
}
