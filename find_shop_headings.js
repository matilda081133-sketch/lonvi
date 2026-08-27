const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

console.log("Searching for headings and 'LONVI' in shop page...");
const lines = html.split('\n');
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('<h1') || line.includes('<h2') || line.includes('LONVI')) {
        console.log(`Line ${i + 1}: ${line.trim().substring(0, 150)}`);
    }
}
