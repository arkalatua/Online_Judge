const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const codeDir = path.join(__dirname, 'code');

if (!fs.existsSync(codeDir)) {
    fs.mkdirSync(codeDir, { recursive: true });
}

async function generateFile(code, language) {
    const fileId = uuidv4();
    const fileName = `${fileId}.${language}`;
    const filePath = path.join(codeDir, fileName);
    
    await fs.promises.writeFile(filePath, code);
    return filePath;
}

module.exports = generateFile;