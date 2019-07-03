const fs = require('fs');
const path = require('path');
const markdownToReact = require('../lib/markdown-to-react-loader');
const pretter = require('prettier');


const expectIO = (inFile, outFile) => {
  let input = getFileContents(inFile);
  let output = getFileContents(outFile);

  let processed = pretter.format(
    markdownToReact(input),
    {
      parser: 'babel',
    }
  );

  expect(output).toEqual(processed);
}

const getFileContents = file => {
  return fs.readFileSync(path.resolve(__dirname, file)).toString('utf-8');
}

test('Compiles hello, world', () => {
  expectIO('io/simple.md', 'io/simple.js');
});

test('Compiles file with imports', () => {
  expectIO('io/imports.md', 'io/imports.js');
});

test('Compiles file with code block', () => {
  expectIO('io/codeblock.md', 'io/codeblock.js');
});

test('Exports extra front matter as named exports', () => {
  expectIO('io/data.md', 'io/data.js');
});

test('Can work with an async component', () => {
  expectIO('io/javascript.md', 'io/javascript.js');
});

test('Properly converts parens & curly brackets', () => {
  expectIO('io/replace-chars.md', 'io/replace-chars.js');
});

test('Converts tables and table cells', () => {
  expectIO('io/table.md', 'io/table.js');
});

test('Can render everything', () => {
  expectIO('io/everything.md', 'io/everything.js');
});
