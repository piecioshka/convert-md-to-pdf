#!/usr/bin/env node

module.exports = Object.assign(
  {},
  require('./src/pdf-helper'),
  require('./src/directory-helper'),
  require('./src/file-remove-helper'),
);
