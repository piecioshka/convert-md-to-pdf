#!/usr/bin/env node

const path = require('path');
const argv = require('yargs').argv;

const { buildPDF } = require('../');
const root = path.join(__dirname, '..');

const DEFAULT_THEME = 'default';

const filepath = argv._[0];
const theme = argv.t || argv.theme || DEFAULT_THEME;

buildPDF({
    source: filepath,
    theme: path.join(root, 'themes', theme + '.css'),
    cb(file) {
        console.log('Created:', file);
    }
});
