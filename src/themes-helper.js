'use strict';

const path = require('path');
const fs = require('fs');

const themesDirectory = path.join(__dirname, '..', 'themes');

function displaySupportedThemes() {
  console.log('List of supported themes:');
  const files = fs.readdirSync(themesDirectory);
  files.forEach((theme) => {
    console.log(`- ${theme.replace('.css', '')}`);
  });
}

module.exports = {
  displaySupportedThemes,
};
