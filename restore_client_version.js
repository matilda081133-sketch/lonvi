const { execSync } = require('child_process');
const fs = require('fs');

console.log("Restoring to the exact version the client loved (commit 8c07cda)...");

try {
    // 1. Hard reset index.html and tilda_main_page.html to commit 8c07cda
    execSync('git reset --hard 8c07cda', { stdio: 'inherit' });
    console.log("Reverted local git folder to 8c07cda.");

    // 2. Copy index.html back to tilda_main_page.html in lonvi-redesign
    const mainPagePath = '../lonvi-redesign/tilda_main_page.html';
    fs.copyFileSync('index.html', mainPagePath);
    console.log("Restored tilda_main_page.html from index.html.");

    // 3. Split the restored file into 3 parts
    console.log("Splitting restored page into parts...");
    const html = fs.readFileSync(mainPagePath, 'utf8');
    const lines = html.split('\n');

    let part1Lines = [];
    let part2Lines = [];
    let part3Lines = [];
    let currentPart = 1;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Split before Section 4 (id="science")
        if (line.includes('<section id="science"')) {
            currentPart = 2;
        }
        // Split before Section 7 (id="faq")
        if (line.includes('<section id="faq"')) {
            currentPart = 3;
        }
        
        if (currentPart === 1) {
            part1Lines.push(line);
        } else if (currentPart === 2) {
            part2Lines.push(line);
        } else {
            part3Lines.push(line);
        }
    }

    const part1Html = part1Lines.join('\n');
    const part2Html = part2Lines.join('\n');
    const part3Html = part3Lines.join('\n');

    fs.writeFileSync('../lonvi-redesign/tilda_main_page_part1.html', part1Html, 'utf8');
    fs.writeFileSync('../lonvi-redesign/tilda_main_page_part2.html', part2Html, 'utf8');
    fs.writeFileSync('../lonvi-redesign/tilda_main_page_part3.html', part3Html, 'utf8');

    console.log("Parts split and saved successfully!");
    console.log("Part 1 Size:", part1Html.length, "bytes");
    console.log("Part 2 Size:", part2Html.length, "bytes");
    console.log("Part 3 Size:", part3Html.length, "bytes");

    // 4. Recreate gitignore to ignore media
    const gitignoreContent = `
ffmpeg.zip
ffmpeg_folder/
*.mov
*.mp4
*.zip
*.log
node_modules/
temp/
`;
    fs.writeFileSync('.gitignore', gitignoreContent, 'utf8');

    // 5. Run sync_and_push.js
    console.log("Re-syncing and pushing to GitHub...");
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Restore complete and pushed!");
} catch (e) {
    console.error("Error restoring version:", e.message);
}
