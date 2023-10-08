'use strict';

const path = require('path');
const fs = require('fs');
const { buildPDF } = require('./pdf-helper');
const root = path.join(__dirname, '..');

function isFileExistAndIsNotEmpty(file) {
  try {
    const stat = fs.statSync(file);
    return stat.isFile() && stat.size > 0;
  } catch (_err) {
    return false;
  }
}

describe('PDFHelper', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20 * 1000;

  beforeAll(() => {
    fs.rmSync(path.join(root, 'dist'), {
      recursive: true,
      force: true,
    });
  });

  it('should generate with defined target (use default theme)', (done) => {
    buildPDF({
      source: path.join(root, 'mock', 'example.md'),
      target: path.join(root, 'dist', 'example-default-theme.pdf'),
      cb(file) {
        expect(isFileExistAndIsNotEmpty(file)).toEqual(true);
        done();
      },
    });
  });

  ['clean', 'dark', 'nord', 'orange'].forEach((theme) => {
    it(`should generate with defined target and theme=${theme}`, (done) => {
      buildPDF({
        source: path.join(root, 'mock', 'example.md'),
        target: path.join(root, 'dist', `example-${theme}-theme.pdf`),
        theme: path.join(root, 'themes', `${theme}.css`),
        cb(file) {
          expect(isFileExistAndIsNotEmpty(file)).toEqual(true);
          done();
        },
      });
    });
  });
});
