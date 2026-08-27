const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\scratch\\github-lonvi\\assets';
const files = fs.readdirSync(dir);
files.forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    console.log(`${f} - ${stat.size} bytes - ${stat.mtime}`);
});
