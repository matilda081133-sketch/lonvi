const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

console.log("Current style tags at the top of the file:");
let startIdx = 0;
for (let j = 0; j < 5; j++) {
    const idx = html.indexOf('<style>', startIdx);
    if (idx !== -1) {
        console.log(`Style Tag ${j + 1} at index ${idx}:`);
        console.log(html.substring(idx, html.indexOf('</style>', idx) + 8));
        startIdx = idx + 7;
    } else {
        break;
    }
}
