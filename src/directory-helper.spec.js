'use strict';

const path = require('path');
const { listDirectory } = require('./directory-helper');
const binPath = path.join(__dirname, '..', 'bin');

describe('DirectoryHelper', () => {
  it('listDirectory', (done) => {
    listDirectory(binPath, (file) => {
      expect(typeof file === 'string').toEqual(true);
      done();
    });
  });
});
