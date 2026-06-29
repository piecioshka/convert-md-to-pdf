import path from 'path';
import minimist from 'minimist';

import { buildPDF } from './pdf-helper';
import { displaySupportedThemes } from './themes-helper';
import { buildOutputFilename } from './file-helper';
import { DEFAULT_THEME } from './config';

function showHelp(): void {
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

Examples:
  convert-md-to-pdf -l
  convert-md-to-pdf doc.md -d my-files/ -o agreement.pdf
  convert-md-to-pdf doc.md -t nord
  convert-md-to-pdf doc.md -p ~/customs.css
`);
}

const argv = minimist(process.argv.slice(2), {
  string: ['theme', 'theme-path', 'destination', 'output', 'mode'],
  boolean: ['help', 'list-themes'],
  alias: {
    h: 'help',
    t: 'theme',
    l: 'list-themes',
    p: 'theme-path',
    d: 'destination',
    o: 'output',
    m: 'mode',
  },
  default: {
    theme: DEFAULT_THEME,
  },
});

if (argv.h) {
  showHelp();
  process.exit(0);
}

if (argv.l) {
  displaySupportedThemes();
  process.exit(0);
}

const source = argv._[0];

if (!source) {
  showHelp();
  process.exit(1);
}

const destination = argv.d
  ? path.resolve(argv.d)
  : path.join(path.dirname(source));
const filename = argv.o ? argv.o : buildOutputFilename(source);
const target = destination && filename && path.join(destination, filename);
const theme = argv.p || path.join(__dirname, '..', 'themes', `${argv.t}.css`);
const mode = ['portrait', 'landscape'].includes(argv.m) ? argv.m : 'portrait';

buildPDF({
  source,
  target,
  theme,
  mode,
  cb(file) {
    console.log('Created:', file);
  },
});
