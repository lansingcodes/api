const assert = require('assert');
const meetupProvider = require('../../src/providers/meetup.provider');

describe('Meetup provider', () => {

  const provider = meetupProvider({}); // TODO: insert a mock meetup API

  describe.skip('getEvents', () => {

    it('resolves on success', () => {
      provider.getEvents({}); // TODO: actual call
      // TODO
      assert.fail('Not implemented');
    });

    it('rejects on error', () => {
      // TODO
      assert.fail('Not implemented');
    });
  });

  describe.skip('getEvent', () => {

    it('resolves on success', () => {
      // TODO
      assert.fail('Not implemented');
    });

    it('rejects on error', () => {
      // TODO
      assert.fail('Not implemented');
    });

  });

});
