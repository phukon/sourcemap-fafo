const fs = require('fs');

function findFunctionPosition(filePath, functionName) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    const regex = new RegExp(`\\b${functionName}\\s*[=:]\\s*function\\b|\\bfunction\\s+${functionName}\\b|\\b${functionName}\\s*[:=]\\s*\\([^)]*\\)\\s*=>`, 'g');
    
    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        const line = lines[lineNumber];
        const match = regex.exec(line);
        
        if (match) {
            return {
                line: lineNumber + 1,
                column: match.index + 1,
                context: line.trim()
            };
        }
    }
    
    return null;
}

// Usage
const minifiedFilePath = '../ecom/dist/assets/index-3920e836.js';
const functionName = 'Gq';

const result = findFunctionPosition(minifiedFilePath, functionName);

if (result) {
    console.log(`Function "${functionName}" found:`);
    console.log(`Line: ${result.line}`);
    console.log(`Column: ${result.column}`);
    // console.log(`Context: ${result.context}`);
} else {
    console.log(`Function "${functionName}" not found in the file.`);
}