'use strict';

const assert = require('assert');
const path = require('path');

const markdownpdf = require('markdown-pdf');
const through = require('through');
const split = require('split');
const duplexer = require('duplexer');

const { getFormattedDate } = require('./date-helper');

function buildOptions() {
  return {
    cssPath: null,
    paperBorder: '0cm',
    // paperBorder: JSON.stringify({
    //     top: '2cm',
    //     right: '2cm',
    //     bottom: '2cm',
    //     left: '2cm'
    // }),
    // paperOrientation: 'landscape',
    remarkable: {
      html: true,
      breaks: true,
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

/**
 * @access public
 * @param {Object} options
 * @param {string} options.source
 * @param {string} options.target
 * @param {string} [options.theme='../themes/default.css']
 * @param {Function} [options.cb]
 */
function buildPDF(options) {
  assert(typeof options.source === 'string', 'options.source is not a string');
  assert(typeof options.target === 'string', 'options.target is not a string');

  const source = options.source;
  const target = options.target;
  const cb = options.cb;
  const theme = options.theme;

  const opts = buildOptions();
  opts.cssPath = theme || path.join(__dirname, '..', 'themes', 'default.css');

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

module.exports = { buildPDF };
