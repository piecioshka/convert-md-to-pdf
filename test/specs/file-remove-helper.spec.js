'use strict';

const { removeAllPDFFiles } = require('../../index');

describe('General :: FileRemoveHelper', () => {
    it('removeAllPDFFiles', () => {
        expect(typeof removeAllPDFFiles === 'function').toEqual(true);
    });
});
