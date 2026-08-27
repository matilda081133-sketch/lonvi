const fs = require('fs');
const { execSync } = require('child_process');

const gitDir = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\scratch\\github-lonvi';

try {
    console.log("Extracting clean image from commit f73e70d...");
    const buffer = execSync('git show f73e70d:assets/gallery-leaves-square.png', {
        cwd: gitDir,
        maxBuffer: 50 * 1024 * 1024,
        encoding: 'buffer'
    });
    
    const destDirs = [
        'C:\\Users\\Honor\\.gemini\\antigravity-ide\\scratch\\lonvi-redesign',
        'C:\\Users\\Honor\\ .gemini\\antigravity-ide\\scratch\\lonvi-redesign',
        'C:\\Users\\Honor\\.gemini\\antigravity-ide\\scratch\\github-lonvi'
    ];
    
    destDirs.forEach(dir => {
        const destFile = `${dir}/assets/gallery-leaves-square-final-clean-v1.png`;
        fs.writeFileSync(destFile, buffer);
        console.log(`Saved image to: ${destFile}`);
    });
    console.log("Completed extraction and save successfully!");
} catch (e) {
    console.error("Failed to extract:", e.message);
}
