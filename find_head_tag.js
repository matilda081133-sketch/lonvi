const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

const match = html.match(/<\/head>/i);
if (match) {
    console.log("Found </head> tag at index:", match.index, "exact match:", match[0]);
} else {
    console.log("No </head> tag found. Searching for </head> case insensitively with regex...");
    const match2 = html.match(/<\/head\s*>/i);
    if (match2) {
        console.log("Found </head> with whitespace:", match2[0]);
    } else {
        console.log("Absolutely no head tag found. First 500 characters of file:");
        console.log(html.substring(0, 500));
    }
}
