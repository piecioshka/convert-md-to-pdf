#!/usr/bin/env node

const path = require('path');
const minimist = require('minimist');
const { buildPDF } = require('../src/pdf-helper');
const { displaySupportedThemes } = require('../src/themes-helper');
const { buildOutputFilename } = require('../src/file-helper');
const { DEFAULT_THEME } = require('../src/config');

function showHelp() {
  console.log(`
Usage: convert-md-to-pdf <path/to/file.md> [options]

Options:
  -h, --help           Show help
  -t, --theme          Use one of built-in themes (default: ${DEFAULT_THEME})
  -l, --list-themes    Display list of built-in themes
  -p, --theme-path     Path to CSS file which will be applied to build a PDF file
  -d, --destination    Directory for output file
  -o, --output         Name of output file
  -m, --mode           Paper orientation, either portrait or landscape
  -b, --border         Spaces around the content, default = 2cm,2cm,2cm,2cm (top, right, bottom, left)

Examples:
  convert-md-to-pdf -l
  convert-md-to-pdf doc.md -d my-files/ -o agreement.pdf
  convert-md-to-pdf doc.md -t nord
  convert-md-to-pdf doc.md -p ~/customs.css
`);
}

const argv = minimist(process.argv.slice(2), {
  string: ['theme', 'theme-path', 'destination', 'output', 'mode', 'border'],
  boolean: ['help', 'list-themes'],
  alias: {
    h: 'help',
    t: 'theme',
    l: 'list-themes',
    p: 'theme-path',
    d: 'destination',
    o: 'output',
    m: 'mode',
    b: 'border',
  },
  default: {
    theme: DEFAULT_THEME,
  },
});

if (argv.help) {
  showHelp();
  process.exit(0);
}

if (argv['list-themes']) {
  displaySupportedThemes();
  process.exit(0);
}

const source = argv._[0];

if (!source) {
  showHelp();
  process.exit(1);
}

const destination = argv.destination
  ? path.resolve(argv.destination)
  : path.join(path.dirname(source));
const filename = argv.output ? argv.output : buildOutputFilename(source);
const target = destination && filename && path.join(destination, filename);
const theme =
  argv['theme-path'] || path.join(__dirname, '..', 'themes', `${argv.theme}.css`);
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
