'use strict';

const { buildPDF } = require('./pdf-helper');

let mockError = null;
let capturedOptions = null;

jest.mock('markdown-pdf', () => {
  return jest.fn((opts) => {
    capturedOptions = opts;
    return {
      from: () => ({
        to: (target, cb) => {
          cb(mockError);
        },
      }),
    };
  });
});

describe('PDFHelper', () => {
  jest.setTimeout(20 * 1000);

  beforeEach(() => {
    mockError = null;
    capturedOptions = null;
  });

  it('should generate file with defined target (use default theme)', (done) => {
    buildPDF({
      source: '/mock/example.md',
      target: '/dist/example-default-theme.pdf',
      cb(file) {
        expect(file).toEqual('/dist/example-default-theme.pdf');
        done();
      },
    });
  });

  ['clean', 'dark', 'nord', 'orange'].forEach((theme) => {
    it(`should generate file with defined target and theme=${theme}`, (done) => {
      buildPDF({
        source: '/mock/example.md',
        target: `/dist/example-${theme}-theme.pdf`,
        theme: `/themes/${theme}.css`,
        cb(file) {
          expect(file).toEqual(`/dist/example-${theme}-theme.pdf`);
          done();
        },
      });
    });
  });

  it('should handle custom border option', (done) => {
    buildPDF({
      source: '/mock/example.md',
      target: '/dist/example-border.pdf',
      border: '1cm, 2cm, 3cm, 4cm',
      cb(file) {
        expect(file).toEqual('/dist/example-border.pdf');
        expect(capturedOptions.paperBorder).toEqual(
          JSON.stringify({ top: '1cm', right: '2cm', bottom: '3cm', left: '4cm' })
        );
        done();
      },
    });
  });

  it('should handle custom mode option', (done) => {
    buildPDF({
      source: '/mock/example.md',
      target: '/dist/example-landscape.pdf',
      mode: 'landscape',
      cb(file) {
        expect(file).toEqual('/dist/example-landscape.pdf');
        expect(capturedOptions.paperOrientation).toEqual('landscape');
        done();
      },
    });
  });

  it('should work without callback', () => {
    buildPDF({
      source: '/mock/example.md',
      target: '/dist/example-no-cb.pdf',
    });
  });

  it('should throw error when markdownpdf fails', () => {
    mockError = new Error('PDF generation failed');
    expect(() => {
      buildPDF({
        source: '/mock/example.md',
        target: '/dist/example-error.pdf',
      });
    }).toThrow('PDF generation failed');
  });

  it('should process preProcessMd with $$SIGNATURE$$ replacement', (done) => {
    buildPDF({
      source: '/mock/example.md',
      target: '/dist/example-signature.pdf',
      cb() {
        expect(capturedOptions.preProcessMd).toBeDefined();
        const processor = capturedOptions.preProcessMd();
        expect(processor).toBeDefined();

        // Test the stream processing by writing data through it
        let outputData = '';
        processor.on('data', (chunk) => {
          outputData += chunk;
        });
        processor.on('end', () => {
          expect(outputData).toContain('Hello World');
          done();
        });
        processor.write('Hello World');
        processor.end();
      },
    });
  });

  it('should throw when source is not a string', () => {
    expect(() => {
      buildPDF({ source: 123, target: '/dist/example.pdf' });
    }).toThrow('options.source is not a string');
  });

  it('should throw when target is not a string', () => {
    expect(() => {
      buildPDF({ source: '/mock/example.md', target: 123 });
    }).toThrow('options.target is not a string');
  });
});
