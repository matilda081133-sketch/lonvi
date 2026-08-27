const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    const filePath = 'file:///' + path.resolve('../lonvi-redesign/tilda_shop_page.html').replace(/\\/g, '/');
    await page.goto(filePath, { waitUntil: 'domcontentloaded' });
    
    const animationDetails = await page.evaluate(() => {
        const el = document.querySelector('.gradient-text-animated');
        if (!el) return { error: "Element not found" };
        const style = window.getComputedStyle(el);
        return {
            animationName: style.animationName,
            animationDuration: style.animationDuration,
            animationPlayState: style.animationPlayState,
            animationDelay: style.animationDelay,
            animationIterationCount: style.animationIterationCount,
            animationTimingFunction: style.animationTimingFunction
        };
    });
    
    console.log("Animation Details:");
    console.log(JSON.stringify(animationDetails, null, 2));
    
    await browser.close();
})();
