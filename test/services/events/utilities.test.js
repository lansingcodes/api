const assert = require('assert');
const { getTimeDifference } = require('../../../src/services/events/utilities');

describe('Events Utilities', () => {
  describe('getTimeDifference', () => {
    const seconds = (n) => n * 1000;
    const minutes = (n) => n * seconds(60);
    const hours = (n) => n * minutes(60);
    const days = (n) => n * hours(24);
    const months = (n) => n * days(30);
    const years = (n) => n * days(365);

    it('returns the correct time unit for each documented range', () => {
      assert.equal(getTimeDifference(seconds(0), 0), 'less than a minute');
      assert.equal(getTimeDifference(seconds(29), 0), 'less than a minute');

      assert.equal(getTimeDifference(seconds(30), 0), '1 minute');
      assert.equal(getTimeDifference(minutes(1) + seconds(29), 0), '1 minute');

      assert.equal(getTimeDifference(minutes(1) + seconds(30), 0), '2 minutes');
      assert.equal(getTimeDifference(minutes(44) + seconds(29), 0), '44 minutes');

      assert.equal(getTimeDifference(minutes(44) + seconds(30), 0), 'about 1 hour');
      assert.equal(getTimeDifference(minutes(89) + seconds(29), 0), 'about 1 hour');

      assert.equal(getTimeDifference(minutes(89) + seconds(30), 0), 'about 2 hours');
      assert.equal(getTimeDifference(hours(23) + minutes(59) + seconds(29), 0), 'about 24 hours');

      assert.equal(getTimeDifference(hours(23) + minutes(59) + seconds(30), 0), '1 day');
      assert.equal(getTimeDifference(hours(41) + minutes(59) + seconds(29), 0), '1 day');

      assert.equal(getTimeDifference(hours(41) + minutes(59) + seconds(30), 0), '2 days');
      assert.equal(getTimeDifference(days(29) + hours(23) + minutes(59) + seconds(29), 0), '29 days');

      assert.equal(getTimeDifference(days(29) + hours(23) + minutes(59) + seconds(30), 0), 'about 1 month');
      assert.equal(getTimeDifference(days(44) + hours(23) + minutes(59) + seconds(29), 0), 'about 1 month');

      assert.equal(getTimeDifference(days(44) + hours(23) + minutes(59) + seconds(30), 0), 'about 2 months');
      assert.equal(getTimeDifference(days(59) + hours(23) + minutes(59) + seconds(29), 0), 'about 2 months');

      assert.equal(getTimeDifference(days(59) + hours(23) + minutes(59) + seconds(30), 0), '2 months');
      assert.equal(getTimeDifference(years(1) - seconds(1), 0), '12 months');

      assert.equal(getTimeDifference(years(1), 0), 'about 1 year');
      assert.equal(getTimeDifference(years(1) + months(3) - seconds(1), 0), 'about 1 year');

      assert.equal(getTimeDifference(years(1) + months(3), 0), 'over 1 year');
      assert.equal(getTimeDifference(years(1) + months(9) - seconds(1), 0), 'over 1 year');

      assert.equal(getTimeDifference(years(1) + months(9), 0), 'almost 2 years');
      assert.equal(getTimeDifference(years(2) - seconds(1), 0), 'almost 2 years');


      assert.equal(getTimeDifference(years(2), 0), 'about 2 years');
      assert.equal(getTimeDifference(years(2) + months(3) - seconds(1), 0), 'about 2 years');

      assert.equal(getTimeDifference(years(2) + months(3), 0), 'over 2 years');
      assert.equal(getTimeDifference(years(2) + months(9) - seconds(1), 0), 'over 2 years');

      assert.equal(getTimeDifference(years(2) + months(9), 0), 'almost 3 years');
      assert.equal(getTimeDifference(years(3) - seconds(1), 0), 'almost 3 years');
    });
  });
});
