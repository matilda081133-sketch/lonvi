const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

console.log("Searching for style tags in shop page...");
const regex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let i = 1;
while ((match = regex.exec(html)) !== null) {
    if (match[1].includes('#1A1C20') || match[1].includes('background') || match[1].includes('body')) {
        console.log(`Style Block ${i++}:`);
        console.log(match[0].substring(0, 400));
    }
}
