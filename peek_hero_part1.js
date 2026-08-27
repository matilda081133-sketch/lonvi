const fs = require('fs');
const file = '../lonvi-redesign/tilda_main_page_part1.html';
const html = fs.readFileSync(file, 'utf8');

const idx = html.indexOf('<section');
if (idx !== -1) {
    const end = html.indexOf('</section>', idx) + 10;
    console.log("Hero Section in Part 1:");
    console.log(html.substring(idx, end));
} else {
    console.log("No section tag found");
}
