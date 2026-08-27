const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

console.log("Checking if group-hover:border-white is in the HTML:");
if (html.includes('group-hover:border-white')) {
    console.log("SUCCESS: group-hover:border-white is in the file!");
    const idx = html.indexOf('group-hover:border-white');
    console.log(html.substring(idx - 100, idx + 200));
} else {
    console.log("FAILURE: group-hover:border-white is NOT in the file!");
}
