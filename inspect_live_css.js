const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.log("Launching browser to inspect computed style of span.gradient-text-animated...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    const filePath = 'file:///' + path.resolve('../lonvi-redesign/tilda_shop_page.html').replace(/\\/g, '/');
    console.log("Opening URL:", filePath);
    
    await page.goto(filePath, { waitUntil: 'domcontentloaded' });
    
    const computedStyle = await page.evaluate(() => {
        const el = document.querySelector('.gradient-text-animated');
        if (!el) return { error: "Element .gradient-text-animated not found!" };
        
        const style = window.getComputedStyle(el);
        return {
            color: style.color,
            webkitTextFillColor: style.webkitTextFillColor,
            backgroundImage: style.backgroundImage,
            backgroundClip: style.backgroundClip,
            webkitBackgroundClip: style.webkitBackgroundClip,
            animation: style.animation,
            display: style.display,
            backgroundSize: style.backgroundSize
        };
    });
    
    console.log("Computed Styles of span.gradient-text-animated:");
    console.log(JSON.stringify(computedStyle, null, 2));
    
    await browser.close();
})();
