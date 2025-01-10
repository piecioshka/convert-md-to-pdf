'use strict';

const path = require('path');
const fs = require('fs');
const { DEFAULT_THEME } = require('./config');

const themesDirectory = path.join(__dirname, '..', 'themes');

function displaySupportedThemes() {
  console.log('List of supported themes:');
  const files = fs.readdirSync(themesDirectory);
  files.forEach((theme) => {
    const name = theme.replace('.css', '');
    const value = name === DEFAULT_THEME ? `${name} (default)` : name;
    console.log(`- ${value}`);
  });
}

module.exports = {
  displaySupportedThemes,
};
