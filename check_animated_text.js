const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

console.log("Checking for gradient-text-animated in shop HTML...");
const matches = [];
let idx = 0;
while ((idx = html.indexOf('gradient-text-animated', idx)) !== -1) {
    matches.push(idx);
    console.log(`Found "gradient-text-animated" at index ${idx}:`);
    console.log(html.substring(Math.max(0, idx - 50), Math.min(html.length, idx + 150)));
    console.log("-".repeat(50));
    idx += 'gradient-text-animated'.length;
}

console.log("Checking for keyframes in shop HTML...");
let idx2 = 0;
while ((idx2 = html.indexOf('gradient-move', idx2)) !== -1) {
    console.log(`Found "gradient-move" at index ${idx2}:`);
    console.log(html.substring(Math.max(0, idx2 - 50), Math.min(html.length, idx2 + 150)));
    console.log("-".repeat(50));
    idx2 += 'gradient-move'.length;
}
