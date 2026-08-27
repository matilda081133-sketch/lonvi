const fs = require('fs');
const path = require('path');

const sourceFile = '../lonvi-redesign/tilda_main_page.html';
const html = fs.readFileSync(sourceFile, 'utf8');

// Build markdown content for the artifact
const mdContent = `# Approved Main Page Code (Одобренный код главной страницы)

Этот код содержит финальную версию главной страницы, одобренную клиентом (восстановлено состояние черно-серого градиента, металлической кнопки и оригинального главного экрана).

\`\`\`html
${html}
\`\`\`
`;

const destPath = 'C:\\Users\\Honor\\.gemini\\antigravity-ide\\brain\\63f6faca-9b7e-429d-bd8a-4372595a87be\\approved_main_page_code.md';
fs.writeFileSync(destPath, mdContent, 'utf8');
console.log("Artifact created successfully at:", destPath);
