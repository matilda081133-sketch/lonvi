const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    const shopPath = 'file:///' + path.resolve('../lonvi-redesign/tilda_shop_page.html').replace(/\\/g, '/');
    await page.goto(shopPath, { waitUntil: 'domcontentloaded' });
    
    const details = await page.evaluate(() => {
        const el = document.querySelector('.gradient-text-animated');
        if (!el) return { error: "Not found" };
        return {
            offsetWidth: el.offsetWidth,
            offsetHeight: el.offsetHeight,
            textContent: el.textContent,
            tagName: el.tagName,
            parentElement: el.parentElement.outerHTML.substring(0, 150),
            computedDisplay: window.getComputedStyle(el).display,
            computedVisibility: window.getComputedStyle(el).visibility
        };
    });
    
    console.log("Element Details on Shop Page:");
    console.log(JSON.stringify(details, null, 2));
    
    await browser.close();
})();
