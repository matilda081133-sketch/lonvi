const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

const tailIdx = html.indexOf('tailwind.config = {');
if (tailIdx !== -1) {
    console.log("Tailwind config in shop page:");
    console.log(html.substring(tailIdx, html.indexOf('}', tailIdx + 400) + 1));
} else {
    console.log("No tailwind config found");
}
