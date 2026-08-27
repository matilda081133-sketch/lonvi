const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

// Print first 50 lines to see document head styles
console.log("Shop head style:");
const headIdx = html.indexOf('<style>');
if (headIdx !== -1) {
    console.log(html.substring(headIdx, html.indexOf('</style>', headIdx) + 8));
}

// Print body start tag
const bodyIdx = html.indexOf('<body');
if (bodyIdx !== -1) {
    console.log("Body tag:");
    console.log(html.substring(bodyIdx, html.indexOf('>', bodyIdx) + 1));
}
