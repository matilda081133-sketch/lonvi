const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Dump Shop Page rules
    const shopPath = 'file:///' + path.resolve('../lonvi-redesign/tilda_shop_page.html').replace(/\\/g, '/');
    await page.goto(shopPath, { waitUntil: 'domcontentloaded' });
    const shopRules = await page.evaluate(() => {
        const rules = [];
        for (const sheet of document.styleSheets) {
            try {
                for (const rule of sheet.cssRules) {
                    if (rule.selectorText && rule.selectorText.includes('gradient-text-animated')) {
                        rules.push({ origin: 'stylesheet', cssText: rule.cssText });
                    }
                    if (rule.name && (rule.name.includes('gradient') || rule.name.includes('chrome'))) {
                        rules.push({ origin: 'keyframes', cssText: rule.cssText });
                    }
                }
            } catch (e) {
                // Ignore
            }
        }
        return rules;
    });
    console.log("=== SHOP PAGE RULES AFTER CLEANUP ===");
    console.log(shopRules);
    
    await browser.close();
})();
