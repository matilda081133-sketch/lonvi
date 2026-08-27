const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

function findOccurrences(query) {
    let idx = 0;
    while ((idx = html.indexOf(query, idx)) !== -1) {
        console.log(`Found "${query}" at index ${idx}:`);
        console.log("SURROUNDING CODE:");
        console.log(html.substring(Math.max(0, idx - 150), Math.min(html.length, idx + query.length + 150)));
        console.log("-".repeat(50));
        idx += query.length;
    }
}

findOccurrences("LONVI PCC1");
findOccurrences("LONVI BIOSCIENCES");
