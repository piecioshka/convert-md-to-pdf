#!/usr/bin/env node

const yargs = require('yargs')
    .usage('Usage: $0 --theme [path/to/file.css] path/to/file.md')
    .example('$0 --theme ~/themes/nordtheme.css meetup.md', '')
    .help('h')
    .option('t', {
        alias: 'theme',
        default: 'default',
        description:
            'Path to CSS file which will be applied to build a PDF file',
    });
const argv = yargs.argv;

const { buildPDF } = require('../');

const source = argv._[0];
const theme = String(argv.theme);

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
