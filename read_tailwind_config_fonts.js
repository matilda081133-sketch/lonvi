const fs = require('fs');

const file = 'C:\\Users\\Honor\\ .gemini\\antigravity-ide\\scratch\\lonvi-redesign\\tilda_main_page.html';
const content = fs.readFileSync(file, 'utf8');

const term = 'tailwind.config';
const index = content.indexOf(term);
if (index !== -1) {
    console.log("Tailwind font configuration:");
    console.log(content.substring(index - 100, index + 1000));
} else {
    console.log("Tailwind config not found");
}
