'use strict';

const { removeAllPDFFiles } = require('./file-remove-helper');

describe('FileRemoveHelper', () => {
  it('removeAllPDFFiles', () => {
    expect(typeof removeAllPDFFiles === 'function').toEqual(true);
  });
});
