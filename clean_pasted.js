const fs = require('fs');
let html = fs.readFileSync('C:\\Users\\Honor\\.gemini\\antigravity-ide\\scratch\\github-lonvi\\pasted_user_request.html', 'utf8');
html = html.replace(/<USER_REQUEST>/g, '').replace(/<\/USER_REQUEST>/g, '').trim();
fs.writeFileSync('C:\\Users\\Honor\\.gemini\\antigravity-ide\\scratch\\github-lonvi\\pasted_user_request.html', html, 'utf8');
console.log("Cleaned request saved.");
