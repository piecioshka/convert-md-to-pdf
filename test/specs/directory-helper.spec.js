'use strict';

const { listDirectory } = require('../../index');

describe('General :: DirectoryHelper', () => {
    it('listDirectory', (done) => {
        listDirectory('.', (file) => {
            expect(typeof file === 'string').toEqual(true);
            done();
        });
    });
});
