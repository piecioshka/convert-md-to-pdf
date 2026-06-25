import assert from 'assert';
import path from 'path';

import markdownpdf from 'markdown-pdf';
import through from 'through';
import split from 'split';
import duplexer from 'duplexer';
import { linkify } from 'remarkable/linkify';

import { getFormattedDate } from './date-helper';
import { DEFAULT_THEME } from './config';

export interface BuildPDFOptions {
  source: string;
  target: string;
  mode?: string;
  border?: string;
  theme?: string;
  cb?: (file: string) => void;
}

interface BuildOptions {
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

function buildOptions(): BuildOptions {
  return {
    cssPath: null,
    paperBorder: JSON.stringify({
      top: '2cm',
      right: '2cm',
      bottom: '2cm',
      left: '2cm',
    }),
    paperOrientation: 'portrait',
    remarkable: {
      html: true,
      breaks: true,
      plugins: [linkify],
    },
    preProcessMd: () => {
      const currentDateTime = getFormattedDate();
      const splitter = split();
      const replacer = through(function (data) {
        this.queue(`${data.replace('$$SIGNATURE$$', currentDateTime)}\n`);
      });
      splitter.pipe(replacer);
      return duplexer(splitter, replacer);
    },
  };
}

// -----------------------------------------------------------------------------

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
    theme || path.join(__dirname, '..', 'themes', `${DEFAULT_THEME}.css`);
  opts.paperOrientation = mode ? mode : opts.paperOrientation;

  if (border) {
    const [top, right, bottom, left] = border
      .split(',')
      .map((value) => value.trim());
    const paperBorder = JSON.stringify({ top, right, bottom, left });
    opts.paperBorder = paperBorder;
  }

  markdownpdf(opts)
    .from(source)
    .to(target, (err) => {
      if (err) {
        throw err;
      }
      if (typeof cb === 'function') {
        cb(target);
      }
    });
}
