const fs = require('fs');
const sourceMap = require('source-map');

async function findOriginalFunction(minifiedName, sourceMapPath) {
  const rawSourceMap = JSON.parse(fs.readFileSync(sourceMapPath, 'utf8'));
  const consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);

  let result = null;
  consumer.eachMapping(function(mapping) {
    if (mapping.name === minifiedName) {
      result = {
        originalName: mapping.name,
        source: mapping.source,
        line: mapping.originalLine,
        column: mapping.originalColumn
      };
      return;
    }
  });

  consumer.destroy();
  return result;
}

// Usage
const minifiedFunctionName = 'Gq';
const sourceMapPath = '../ecom/dist/assets/index-3920e836.js.map';

findOriginalFunction(minifiedFunctionName, sourceMapPath)
  .then(result => {
    if (result) {
      console.log(`Original function name: ${result.originalName}`);
      console.log(`Found in file: ${result.source}`);
      console.log(`At line: ${result.line}, column: ${result.column}`);
    } else {
      console.log(`Function "${minifiedFunctionName}" not found in the source map.`);
    }
  })
  .catch(error => console.error('Error:', error));