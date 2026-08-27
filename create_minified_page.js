const fs = require('fs');
const file = '../lonvi-redesign/tilda_main_page.html';
const html = fs.readFileSync(file, 'utf8');

// Minify CSS
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}|:;,])\s*/g, '$1')
        .replace(/;\}/g, '}')
        .trim();
}

// Minify JS
function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Minify HTML
let min = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, css) => '<style>' + minifyCSS(css) + '</style>')
    .replace(/<script(?!\s+tailwind)>([\s\S]*?)<\/script>/gi, (match, js) => '<script>' + minifyJS(js) + '</script>')
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .trim();

fs.writeFileSync('../lonvi-redesign/tilda_main_page_minified.html', min, 'utf8');
console.log("Minified HTML written to tilda_main_page_minified.html. Size:", min.length, "bytes");

// Sync to github folder
fs.copyFileSync('../lonvi-redesign/tilda_main_page_minified.html', 'tilda_main_page_minified.html');

const { execSync } = require('child_process');
try {
    execSync('git add tilda_main_page_minified.html', { stdio: 'inherit' });
    execSync('git commit -m "Add minified tilda page"', { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log("Pushed minified file successfully!");
} catch (e) {
    console.error("Git error:", e.message);
}
