const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

console.log("Shop Page head structure:");
console.log(html.substring(0, 1000));

console.log("\nShop Page body tags:");
const lines = html.split('\n');
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('<body') || line.includes('<style') || line.includes('background:')) {
        console.log(`Line ${i + 1}: ${line.trim()}`);
    }
}
