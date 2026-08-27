const fs = require('fs');
const path = require('path');

const file = '../lonvi-redesign/tilda_main_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Original html size:", html.length, "bytes");

// 1. Extract large SVGs and replace them with CDN links to shrink HTML size
const svgRegex = /<svg viewBox="0 0 80 80" fill="none" class="w-full h-full">([\s\S]*?)<\/svg>/gi;
// Let's find the mechanism SVGs
// We will replace them in a targeted way so we don't break anything.
// Instead of complex parsing, let's write a script to output the minified version of CSS, JS and HTML first.

// Minify CSS function
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
        .replace(/\s+/g, ' ')             // collapse whitespace
        .replace(/\s*([{}|:;,])\s*/g, '$1') // remove spaces around symbols
        .replace(/;\}/g, '}')             // remove trailing semicolons
        .trim();
}

// Minify JS function
function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\//g, '') // remove block comments
        .replace(/\/\/.*$/gm, '')         // remove inline comments (careful with URLs)
        .replace(/\s+/g, ' ')             // collapse whitespace
        .trim();
}

// Replace styles with minified styles
html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, css) => {
    return '<style>' + minifyCSS(css) + '</style>';
});

// Replace scripts with minified scripts (excluding inline tailwind config which might have syntax quirks)
html = html.replace(/<script(?!\s+tailwind)>([\s\S]*?)<\/script>/gi, (match, js) => {
    return '<script>' + minifyJS(js) + '</script>';
});

// Minify HTML structure
let min = html
    .replace(/<!--[\s\S]*?-->/g, '') // remove comments
    .replace(/>\s+</g, '><')          // collapse whitespace between tags
    .replace(/\s+/g, ' ')             // collapse remaining whitespace
    .trim();

console.log("Minified size after CSS/JS compression:", min.length, "bytes");
