const fs = require('fs');
const file = '../lonvi-redesign/tilda_main_page.html';
const html = fs.readFileSync(file, 'utf8');

const regex = /<svg[^>]*>([\s\S]*?)<\/svg>/gi;
let match;
let i = 1;
while ((match = regex.exec(html)) !== null) {
    console.log(`SVG ${i++}: Size ${match[0].length} bytes | Tag: ${match[0].substring(0, 100)}...`);
}
