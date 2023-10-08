'use strict';

const assert = require('assert');
const fs = require('fs');

/**
 * @access public
 * @param {string} pathname
 * @param {Function} cb
 */
function listDirectory(pathname, cb) {
  assert(typeof pathname === 'string');
  assert(typeof cb === 'function');
  fs.readdir(pathname, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach(cb);
  });
}

module.exports = { listDirectory };
