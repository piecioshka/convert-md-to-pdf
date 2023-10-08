#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs')
  .usage('Usage: convert-markdown-to-pdf path/to/file.md [options]')
  .example('convert-markdown-to-pdf document.md --theme nord', '')
  .help('h')
  .option('t', {
    alias: 'theme',
    default: 'default',
    description: 'Use on of build-in themes',
  })
  .option('p', {
    alias: 'theme-path',
    description: 'Path to CSS file which will be applied to build a PDF file',
  });
const argv = yargs.argv;

const { buildPDF } = require('../');

const source = argv._[0];
const theme =
  argv.themePath || path.join(__dirname, '..', 'themes', `${argv.theme}.css`);

if (!source) {
  yargs.showHelp();
  process.exit();
}

buildPDF({
  source,
  theme,
  cb(file) {
    console.log('Created:', file);
  },
});
