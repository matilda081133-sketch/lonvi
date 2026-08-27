const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

console.log("Searching for color declarations in HTML attributes...");
const regex = /style="[^"]*color:\s*([^";]*)[^"]*"/gi;
let match;
let i = 1;
while ((match = regex.exec(html)) !== null) {
    console.log(`Match ${i++}: ${match[0]} | Color: ${match[1]}`);
}
