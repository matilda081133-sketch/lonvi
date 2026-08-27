const { execSync } = require('child_process');

console.log("Checking commit history and index.html sizes using Node...");

try {
    const commits = execSync('git log --pretty=format:"%h" -n 25', { encoding: 'utf8' }).trim().split('\n');
    for (const commit of commits) {
        try {
            const content = execSync(`git show ${commit}:index.html`, { maxBuffer: 10 * 1024 * 1024 });
            const size = content.length;
            const desc = execSync(`git log -1 --pretty=format:"%s" ${commit}`, { encoding: 'utf8' }).trim();
            console.log(`${commit}: ${size} bytes | ${desc}`);
        } catch (e) {
            console.log(`${commit}: file index.html not found at this commit`);
        }
    }
} catch (e) {
    console.error("Error checking history:", e.message);
}
