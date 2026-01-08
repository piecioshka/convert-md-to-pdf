import { getFormattedDate } from './date-helper';

describe('getFormattedDate', () => {
  it('should return proper date', () => {
    jasmine.clock().install();
    const baseTime = new Date(2013, 9, 23);
    jasmine.clock().mockDate(baseTime);
    const output = getFormattedDate();
    expect(output).toBe('2013-10-23 00:00:00');
  });
});
