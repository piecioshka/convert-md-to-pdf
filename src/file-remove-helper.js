'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const { listDirectory } = require('./directory-helper');

const isPDFFilename = /^(.*)\.pdf$/;

function removeFile(file, cb) {
  fs.unlink(file, (err) => {
    if (err) {
      return void console.error(err);
    }
    if (typeof cb === 'function') {
      cb(file);
    }
  });
}

/**
 * @access public
 * @param {string} pathname
 */
function removeAllPDFFiles(pathname) {
  assert(typeof pathname === 'string');
  listDirectory(pathname, (filename) => {
    if (isPDFFilename.test(filename)) {
      const file = path.join(pathname, filename);
      removeFile(file, () => {
        console.log('Removed', file);
      });
    }
  });
}

module.exports = { removeAllPDFFiles };
