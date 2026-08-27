const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("Copying files to github-lonvi...");
const filesToCopy = [
    'tilda_main_page.html',
    'tilda_main_page_part1.html',
    'tilda_main_page_part2.html',
    'tilda_main_page_part3.html',
    'tilda_shop_page.html'
];

const srcDir = path.join(__dirname, '..', 'lonvi-redesign');
const destDir = __dirname;

filesToCopy.forEach(file => {
    const src = path.join(srcDir, file);
    const dest = path.join(destDir, file === 'tilda_main_page.html' ? 'index.html' : file === 'tilda_shop_page.html' ? 'shop.html' : file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${file} successfully.`);
    } else {
        console.log(`Warning: ${file} not found in source folder.`);
    }
});

console.log("Staging changes in git...");
execSync('git add .gitignore index.html shop.html tilda_main_page_part1.html tilda_main_page_part2.html tilda_main_page_part3.html', { stdio: 'inherit' });

console.log("Committing changes...");
try {
    execSync('git commit -m "Sync split page parts and index"', { stdio: 'inherit' });
} catch (e) {
    console.log("Nothing new to commit or commit failed.");
}

console.log("Pushing to github...");
try {
    execSync('git push', { stdio: 'inherit' });
    console.log("Pushed successfully.");
} catch (e) {
    console.error("Push failed:", e.message);
}
