'use strict';

const path = require('path');
const { buildPDF } = require('./pdf-helper');
const root = path.join(__dirname, '..');

describe('PDFHelper', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20 * 1000;

  it('should generate only with source', (done) => {
    buildPDF({
      source: path.join(root, 'mock/example.md'),
      cb(_file) {
        expect(true).toEqual(true);
        done();
      },
    });
  });

  it('should generate with defined target (use default theme)', (done) => {
    buildPDF({
      source: path.join(root, 'mock/example.md'),
      target: path.join(root, 'dist/example-default-theme.pdf'),
      cb(_file) {
        expect(true).toEqual(true);
        done();
      },
    });
  });

  ['clean', 'dark', 'nord', 'orange'].forEach((theme) => {
    it(`should generate with defined target and theme=${theme}`, (done) => {
      buildPDF({
        source: path.join(root, 'mock/example.md'),
        target: path.join(root, `dist/example-${theme}-theme.pdf`),
        theme: path.join(root, 'themes', `${theme}.css`),
        cb(_file) {
          expect(true).toEqual(true);
          done();
        },
      });
    });
  });
});
