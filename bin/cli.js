#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs');
const { buildPDF } = require('../src/pdf-helper');
const { displaySupportedThemes } = require('../src/themes-helper');
const { buildOutputFilename } = require('../src/file-helper');
const { DEFAULT_THEME } = require('../src/config');

yargs
  .usage('Usage: $0 <path/to/file.md> [options]')
  .example('$0 -l', '')
  .example('$0 doc.md -d my-files/ -o agreement.pdf', '')
  .example('$0 doc.md -t nord', '')
  .example('$0 doc.md -p ~/customs.css', '')
  .help('h')
  .option('t', {
    alias: 'theme',
    default: DEFAULT_THEME,
    description: 'Use on of built-in themes',
  })
  .option('l', {
    alias: 'list-themes',
    description: 'Display list of built-in themes',
  })
  .option('p', {
    alias: 'theme-path',
    description: 'Path to CSS file which will be applied to build a PDF file',
  })
  .option('d', {
    alias: 'destination',
    description: 'Directory for output file',
  })
  .option('o', {
    alias: 'output',
    description: 'Name of output file',
  })
  .option('m', {
    alias: 'mode',
    description: 'Paper orientation, either portrait or landscape',
  })
  .option('b', {
    alias: 'border',
    description:
      'Spaces around the content, default = 2cm,2cm,2cm,2cm (top, right, bottom, left)',
  });

const argv = yargs.argv;

if (argv.listThemes) {
  displaySupportedThemes();
  process.exit(0);
}

const source = argv._[0];

if (!source) {
  yargs.showHelp();
  process.exit(1);
}

const destination = argv.destination
  ? path.resolve(argv.destination)
  : path.join(path.dirname(source));
const filename = argv.output ? argv.output : buildOutputFilename(source);
const target = destination && filename && path.join(destination, filename);
const theme =
  argv.themePath || path.join(__dirname, '..', 'themes', `${argv.theme}.css`);
const mode = ['portrait', 'landscape'].includes(argv.mode)
  ? argv.mode
  : 'portrait';
const border = argv.border || '2cm,2cm,2cm,2cm';

buildPDF({
  source,
  target,
  theme,
  mode,
  border,
  cb(file) {
    console.log('Created:', file);
  },
});
