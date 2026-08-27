const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

function findTag(query) {
    let idx = 0;
    while ((idx = html.indexOf(query, idx)) !== -1) {
        // Only print if not inside <style>
        const before = html.substring(0, idx);
        const insideStyle = before.lastIndexOf('<style>') > before.lastIndexOf('</style>');
        if (!insideStyle) {
            console.log(`Found actual tag for "${query}":`);
            console.log(html.substring(idx - 50, idx + 250));
            console.log("-".repeat(50));
        }
        idx += query.length;
    }
}

findTag("lv-open-modal-btn");
findTag("lv-submit");
