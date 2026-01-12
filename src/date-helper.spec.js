'use strict';

const { getFormattedDate } = require('./date-helper');

describe('getFormattedDate', () => {
  it('should return proper date', () => {
    jest.useFakeTimers();
    const baseTime = new Date(2013, 9, 23);
    jest.setSystemTime(baseTime);
    const output = getFormattedDate();
    expect(output).toBe('2013-10-23 00:00:00');
    jest.useRealTimers();
  });
});
