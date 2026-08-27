const fs = require('fs');
const path = require('path');

const logDir = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\.system_generated\\logs';
const transcriptFull = path.join(logDir, 'transcript_full.jsonl');
const transcriptCompact = path.join(logDir, 'transcript.jsonl');

try {
    const fileToRead = fs.existsSync(transcriptFull) ? transcriptFull : transcriptCompact;
    console.log("Reading:", fileToRead);
    const lines = fs.readFileSync(fileToRead, 'utf8').trim().split('\n');
    // The last line is the model's current step, the second to last line is the user's input
    let userStepIndex = lines.length - 2;
    while (userStepIndex >= 0) {
        const step = JSON.parse(lines[userStepIndex]);
        if (step.source === 'USER_EXPLICIT' || (step.type === 'USER_INPUT')) {
            console.log("User step found at index:", userStepIndex);
            const content = step.content || "";
            console.log("Content length:", content.length);
            console.log("First 500 chars of content:", content.substring(0, 500));
            // Let's write the content to a temporary file so we can diff it
            fs.writeFileSync('C:\\Users\\Honor\\.gemini\\antigravity-ide\\scratch\\github-lonvi\\pasted_user_request.html', content);
            break;
        }
        userStepIndex--;
    }
} catch (e) {
    console.error(e.message);
}
