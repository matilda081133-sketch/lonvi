const fs = require('fs');
const file = '../lonvi-redesign/tilda_shop_page.html';
const html = fs.readFileSync(file, 'utf8');

const btnIdx = html.indexOf('lv-open-modal-btn');
if (btnIdx !== -1) {
    console.log("Open Modal Button tag:");
    console.log(html.substring(btnIdx - 50, btnIdx + 250));
}

const submitIdx = html.indexOf('id="lv-submit"');
if (submitIdx !== -1) {
    console.log("\nSubmit Button tag:");
    console.log(html.substring(submitIdx - 50, submitIdx + 250));
} else {
    const submitIdx2 = html.indexOf('lv-submit');
    if (submitIdx2 !== -1) {
        console.log("\nSubmit Button tag (by class/id match):");
        console.log(html.substring(submitIdx2 - 50, submitIdx2 + 250));
    }
}
