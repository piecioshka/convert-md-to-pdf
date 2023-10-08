'use strict';

const path = require('path');
const { getFormattedDate } = require('./date-helper');

function buildOutputFilename(source) {
  const extname = path.extname(source);
  const basename = path.basename(source, extname);
  const currentDateTime = getFormattedDate().replace(/[: ]/g, '-');
  return `${basename}-${currentDateTime}.pdf`;
}

module.exports = {
  buildOutputFilename,
};
