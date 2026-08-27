const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Test Main Page
    const mainPath = 'file:///' + path.resolve('../lonvi-redesign/tilda_main_page.html').replace(/\\/g, '/');
    await page.goto(mainPath, { waitUntil: 'domcontentloaded' });
    const mainPos1 = await page.evaluate(() => {
        const el = document.querySelector('.gradient-text-animated');
        return el ? window.getComputedStyle(el).backgroundPosition : 'NOT_FOUND';
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mainPos2 = await page.evaluate(() => {
        const el = document.querySelector('.gradient-text-animated');
        return el ? window.getComputedStyle(el).backgroundPosition : 'NOT_FOUND';
    });
    console.log("Main Page heading initial:", mainPos1, "after 1s:", mainPos2);
    
    // Test Shop Page
    const shopPath = 'file:///' + path.resolve('../lonvi-redesign/tilda_shop_page.html').replace(/\\/g, '/');
    await page.goto(shopPath, { waitUntil: 'domcontentloaded' });
    const shopPos1 = await page.evaluate(() => {
        const el = document.querySelector('.gradient-text-animated');
        return el ? window.getComputedStyle(el).backgroundPosition : 'NOT_FOUND';
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    const shopPos2 = await page.evaluate(() => {
        const el = document.querySelector('.gradient-text-animated');
        return el ? window.getComputedStyle(el).backgroundPosition : 'NOT_FOUND';
    });
    console.log("Shop Page heading initial:", shopPos1, "after 1s:", shopPos2);
    
    await browser.close();
})();
