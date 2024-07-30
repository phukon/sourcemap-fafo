function findFunctionInMinifiedCode(functionName) {
    const scripts = Array.from(document.getElementsByTagName('script'));
    const findInScript = (scriptContent) => {
        const lines = scriptContent.split('\n');
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
    };
    
    // Search through all scripts
    for (const script of scripts) {
        if (script.src) {
          console.log('hit')
            // For external scripts, we need to fetch the content
            fetch(script.src)
                .then(response => response.text())
                .then(content => {
                        const result = findInScript(content);
                        if (result) {
                            console.log(`Function "${functionName}" found in ${script.src}:`);
                            console.log(`Line: ${result.line}`);
                            console.log(`Column: ${result.column}`);
                        }
                })
                .catch(error => console.error(`Error fetching ${script.src}:`, error));
        } else if (script.textContent && isMinified(script.textContent)) {
            // For inline scripts
            const result = findInScript(script.textContent);
            if (result) {
                console.log(`Function "${functionName}" found in inline script:`);
                console.log(`Line: ${result.line}`);
                console.log(`Column: ${result.column}`);
                console.log(`Context: ${result.context}`);
            }
        }
    }
}

findFunctionInMinifiedCode('ex');