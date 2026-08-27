const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
    
    console.log("Navigating to local shop page...");
    await page.goto('http://localhost:8000/tilda_shop_page.html', { waitUntil: 'networkidle2' });
    
    console.log("Waiting 3 seconds...");
    await new Promise(r => setTimeout(r, 3000));
    
    await browser.close();
    console.log("Done.");
})();
