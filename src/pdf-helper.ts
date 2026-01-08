import { strict as assert } from 'assert';
import * as path from 'path';
import markdownpdf = require('markdown-pdf');
import through = require('through');
import split = require('split');
import duplexer = require('duplexer');
import { linkify } from 'remarkable/linkify';
import { getFormattedDate } from './date-helper';
import { DEFAULT_THEME } from './config';

interface PaperBorder {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

interface MarkdownPdfOptions {
  cssPath: string | null;
  paperBorder: string;
  paperOrientation: string;
  remarkable: {
    html: boolean;
    breaks: boolean;
    plugins: unknown[];
  };
  preProcessMd: () => NodeJS.ReadWriteStream;
}

function buildOptions(): MarkdownPdfOptions {
  return {
    cssPath: null,
    paperBorder: JSON.stringify({
      top: '2cm',
      right: '2cm',
      bottom: '2cm',
      left: '2cm',
    } as PaperBorder),
    paperOrientation: 'portrait',
    remarkable: {
      html: true,
      breaks: true,
      plugins: [linkify],
    },
    preProcessMd: () => {
      const currentDateTime = getFormattedDate();
      const splitter = split();
      const replacer = through(function (data: string) {
        this.queue(`${data.replace('$$SIGNATURE$$', currentDateTime)}\n`);
      });
      splitter.pipe(replacer);
      return duplexer(splitter, replacer);
    },
  };
}

// -----------------------------------------------------------------------------

export interface BuildPDFOptions {
  source: string;
  target: string;
  mode?: string;
  border?: string;
  theme?: string;
  cb?: (file: string) => void;
}

/**
 * Build a PDF from a markdown file
 * @param options - Configuration options for PDF generation
 */
export function buildPDF(options: BuildPDFOptions): void {
  assert(typeof options.source === 'string', 'options.source is not a string');
  assert(typeof options.target === 'string', 'options.target is not a string');

  const source = options.source;
  const target = options.target;
  const cb = options.cb;
  const theme = options.theme;
  const mode = options.mode;
  const border = options.border;

  const opts = buildOptions();
  opts.cssPath =
    theme || path.join(__dirname, '..', '..', 'themes', `${DEFAULT_THEME}.css`);
  opts.paperOrientation = mode ? mode : opts.paperOrientation;

  if (border) {
    const [top, right, bottom, left] = border
      .split(',')
      .map((value) => value.trim());
    const paperBorder: PaperBorder = { top, right, bottom, left };
    opts.paperBorder = JSON.stringify(paperBorder);
  }

  markdownpdf(opts)
    .from(source)
    .to(target, (err: Error | null) => {
      if (err) {
        throw err;
      }
      if (typeof cb === 'function') {
        cb(target);
      }
    });
}
