'use strict';

const toTwoZeros = (value) => String(value).padStart(2, '0');

function getFormattedDate(d = new Date()) {
  const year = d.getFullYear();
  const month = toTwoZeros(d.getMonth() + 1);
  const day = toTwoZeros(d.getDate());
  const hours = toTwoZeros(d.getHours());
  const minutes = toTwoZeros(d.getMinutes());
  const seconds = toTwoZeros(d.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
  getFormattedDate,
};
