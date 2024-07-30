/**
 * Get the position in the original source code from the minified code.
 */
const fs = require('fs');
const rawSourceMap = fs.readFileSync('../ecom/dist/assets/index-3920e836.js.map');
const { SourceMapConsumer } = require('source-map');

let rawSourceMapJson = JSON.parse(rawSourceMap);

new SourceMapConsumer(rawSourceMapJson)


new SourceMapConsumer(rawSourceMapJson).then((sourceMapConsumer) => {
  const pos = {
    line: 446,
    column: 33198
  };
  console.log(sourceMapConsumer.originalPositionFor(pos));
});

// new SourceMapConsumer(rawSourceMapJson).then((sourceMapConsumer) => {
//   const sources = sourceMapConsumer.sources;

//   sources.forEach(source => {
//     console.log('Source:', source);
//     console.log('Content:', sourceMapConsumer.sourceContentFor(source));
//   });
// });