const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

const regex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let i = 1;
while ((match = regex.exec(html)) !== null) {
    if (match[1].includes('lv-open-modal-btn') || match[1].includes('bg-brandgold') || match[1].includes('lv-submit')) {
        console.log(`Style block ${i++}:`);
        console.log(match[0]);
        console.log("-".repeat(50));
    }
}
