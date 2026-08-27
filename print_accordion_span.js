const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

const detailsIdx = html.indexOf('<details');
if (detailsIdx !== -1) {
    console.log("Accordion Tag:");
    console.log(html.substring(detailsIdx, detailsIdx + 800));
} else {
    console.log("No details tags found!");
}
