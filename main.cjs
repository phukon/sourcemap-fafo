/**
 * Get the position in the original source code from the minified code.
 */
const fs = require('fs');
const rawSourceMap = fs.readFileSync('../ecom/dist/assets/index-d5a80b6b.js.map');
const { SourceMapConsumer } = require('source-map');

let rawSourceMapJson = JSON.parse(rawSourceMap);

new SourceMapConsumer(rawSourceMapJson)


new SourceMapConsumer(rawSourceMapJson).then((sourceMapConsumer) => {
  const pos = {
    line: 451,
    column: 6167
  };
  console.log(sourceMapConsumer.originalPositionFor(pos));
});