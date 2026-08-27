const fs = require('fs');
const file = '../lonvi-redesign/tilda_main_page.html';
const html = fs.readFileSync(file, 'utf8');

console.log("Checking main page gradient-text-animated definitions:");
let idx = 0;
while ((idx = html.indexOf('gradient-text-animated', idx)) !== -1) {
    console.log(html.substring(Math.max(0, idx - 50), Math.min(html.length, idx + 250)));
    console.log("-".repeat(50));
    idx += 'gradient-text-animated'.length;
}

console.log("\nChecking main page gradient-move keyframe definitions:");
let idx2 = 0;
while ((idx2 = html.indexOf('gradient-move', idx2)) !== -1) {
    console.log(html.substring(Math.max(0, idx2 - 50), Math.min(html.length, idx2 + 250)));
    console.log("-".repeat(50));
    idx2 += 'gradient-move'.length;
}
