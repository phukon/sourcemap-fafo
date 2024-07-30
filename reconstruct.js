/**
 * Reconstructs source code from the source maps
 */
const fs = require('fs');
const prettier = require('prettier');
const { SourceMapConsumer } = require('source-map');

const minifiedCode = fs.readFileSync('../ecom/dist/assets/index-3920e836.js', 'utf8');
const rawSourceMap = fs.readFileSync('../ecom/dist/assets/index-3920e836.js.map', 'utf8');
const rawSourceMapJson = JSON.parse(rawSourceMap);

const lines = minifiedCode.split('\n');

new SourceMapConsumer(rawSourceMapJson).then((sourceMapConsumer) => {
  const reconstructedSource = {};

  lines.forEach((line, lineIndex) => {
    const lineNum = lineIndex + 1;
    const segments = line.split(';');

    segments.forEach((segment, segmentIndex) => {
      const column = segment.length;
      const pos = {line: lineNum, column: column};
      const originalPosition = sourceMapConsumer.originalPositionFor(pos);

      if (originalPosition.source === null || originalPosition.name === null) {
        return;
      }

      if (!reconstructedSource[originalPosition.source]) {
        reconstructedSource[originalPosition.source] = [];
      }

      // Replace the obfuscated name with the original name
      segments[segmentIndex] = segment.replace(/[_$][\w\d]+/g, originalPosition.name);
    });

    lines[lineIndex] = segments.join(';');
  });

  for (const source in reconstructedSource) {
    let prettyCode = lines.join('\n');

    // Pass the code through Prettier
    const formattedCode = prettier.format(prettyCode, { parser: 'babel' });

    // Log the reconstructed source code
    console.log(`Source: ${source}`);
    console.log('Content:', formattedCode);
  }
});