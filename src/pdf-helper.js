'use strict';

const assert = require('assert');
const path = require('path');

const markdownpdf = require('markdown-pdf');
const through = require('through');
const split = require('split');
const duplexer = require('duplexer');

const moment = require('moment');

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
        remarkable: {
            html: true,
            breaks: true,
            linkify: true
        },
        preProcessMd: () => {
            const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
            const signature = `Data wygenerowania: ${currentDateTime}`;

            const splitter = split();
            const replacer = through(function (data) {
                this.queue(`${data.replace('$$SIGNATURE$$', signature)}\n`);
            });
            splitter.pipe(replacer);
            return duplexer(splitter, replacer);
        }
    };
}

function buildPathname(source, target) {
    if (target) {
        return target;
    }

    const dirname = path.dirname(source);
    const extname = path.extname(source);
    const basename = path.basename(source, extname);
    const currentDateTime = moment().format('YYYY-MM-DD-HH-mm-ss');

    return path.join(dirname, `${basename}-${currentDateTime}.pdf`);
}

// -----------------------------------------------------------------------------

/**
 * @access public
 * @param {Object} settings
 * @param {string} settings.source
 * @param {string} [settings.target]
 * @param {string} [settings.theme='default']
 * @param {Function} [settings.cb]
 */
function buildPDF(settings) {
    assert(typeof settings.source === 'string');

    const source = settings.source;
    const target = buildPathname(source, settings.target);
    const cb = settings.cb;

    const opts = buildOptions();
    opts.cssPath = settings.theme
        || path.join(__dirname, '..', 'themes', 'default.css');

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
