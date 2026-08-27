const fs = require('fs');
const file = 'C:\\Users\\Honor\\ .gemini\\antigravity-ide\\scratch\\lonvi-redesign\\tilda_shop_page.html';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('Logo') || line.includes('logo-light') || line.includes('logo-dark')) {
        console.log(`Line ${idx+1}: ${line.trim()}`);
    }
});
