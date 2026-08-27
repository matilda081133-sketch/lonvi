const fs = require('fs');
const file = 'shop.html';
const html = fs.readFileSync(file, 'utf8');

console.log("Repo Shop Page head styles:");
const headIdx = html.indexOf('<style>');
if (headIdx !== -1) {
    console.log(html.substring(headIdx, html.indexOf('</style>', headIdx) + 8));
}

console.log("\nRepo Shop Page body tags:");
const bodyIdx = html.indexOf('<body');
if (bodyIdx !== -1) {
    console.log(html.substring(bodyIdx, html.indexOf('>', bodyIdx) + 1));
}
