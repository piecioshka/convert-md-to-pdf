'use strict';

const path = require('path');
const { buildPDF } = require('./pdf-helper');
const root = path.join(__dirname, '..');

describe('PDFHelper', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20 * 1000;

  it('should generate from markdown file (only source)', (done) => {
    buildPDF({
      source: path.join(root, 'mock/example.md'),
      cb(file) {
        console.log('Created', file);
        expect(true).toEqual(true);
        done();
      },
    });
  });

  it('should generate from markdown file (+target)', (done) => {
    buildPDF({
      source: path.join(root, 'mock/example.md'),
      target: path.join(root, 'dist/example-default-theme.pdf'),
      cb(file) {
        console.log('Created', file);
        expect(true).toEqual(true);
        done();
      },
    });
  });

  it('should generate from markdown file (+target +theme=dark)', (done) => {
    buildPDF({
      source: path.join(root, 'mock/example.md'),
      target: path.join(root, 'dist/example-dark-theme.pdf'),
      theme: path.join(root, 'themes', 'default.css'),
      cb(file) {
        console.log('Created', file);
        expect(true).toEqual(true);
        done();
      },
    });
  });
});
