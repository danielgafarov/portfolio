const fs = require('fs');
const path = require('path');
const process = require('process');


const readJSON = (resourcePath) => {
    const filePath = path.join(process.cwd(),resourcePath)
    const data = fs.readFileSync(filePath, 'utf8');
    try {
        const jsonData = JSON.parse(data); // Parse JSON
        return jsonData;
    } catch (parseErr) {
        console.error('Invalid JSON format');
    }
}

module.exports = {readJSON}