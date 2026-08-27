const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.log("Launching browser to verify if the animation actually moves background-position...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    const filePath = 'file:///' + path.resolve('../lonvi-redesign/tilda_shop_page.html').replace(/\\/g, '/');
    await page.goto(filePath, { waitUntil: 'domcontentloaded' });
    
    // Read background position initially
    const pos1 = await page.evaluate(() => {
        const el = document.querySelector('.gradient-text-animated');
        return window.getComputedStyle(el).backgroundPosition;
    });
    console.log("Initial backgroundPosition:", pos1);
    
    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Read background position again
    const pos2 = await page.evaluate(() => {
        const el = document.querySelector('.gradient-text-animated');
        return window.getComputedStyle(el).backgroundPosition;
    });
    console.log("After 2s backgroundPosition:", pos2);
    
    if (pos1 !== pos2) {
        console.log("SUCCESS: Background position is changing. Animation IS running in the browser!");
    } else {
        console.log("FAILURE: Background position is static! Animation is NOT running!");
    }
    
    await browser.close();
})();
