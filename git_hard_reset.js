const { execSync } = require('child_process');
const fs = require('fs');

console.log("Starting git recovery...");

try {
    // 1. Reset hard to remote origin/main to clean the local commit history
    execSync('git reset --hard origin/main', { stdio: 'inherit' });
    console.log("Hard reset to origin/main complete.");

    // 2. Write the .gitignore file immediately
    const gitignoreContent = `
# Ignore large media and tool files
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
    console.log(".gitignore created.");

    // 3. Stage and commit .gitignore first
    execSync('git add .gitignore', { stdio: 'inherit' });
    execSync('git commit -m "Add gitignore to block large files"', { stdio: 'inherit' });
    console.log(".gitignore committed.");

    // 4. Run sync_and_push.js to stage and push the valid redesign parts
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
    console.log("Sync and push completed successfully!");
} catch (e) {
    console.error("Error during recovery:", e.message);
}
