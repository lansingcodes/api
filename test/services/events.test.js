const assert = require('assert');
const createService = require('../../src/services/events/events.class');
const sinon = require('sinon');
const testData = require('../testData');

describe('\'events\' service', () => {
  const midMichiganAgileGroupId = 1708426;
  const mmagRawEvents = testData.meetupApi.getMidMichiganAgileEvents();
  const mmagTransformedEvents = testData.eventService.getMidMichiganAgileEvents();

  let mockMeetupProvider = {
    getEvents: sinon.stub(),
    getEvent: sinon.stub()
  };
  let service;


  it('registered the service', () => {
    process.env.MEETUP_API_KEY = 'defined';
    const app = require('../../src/app');

    service = app.service('events');

    assert.ok(service, 'Registered the service');
  });

  describe('find', () => {
    beforeEach('Instantiate the service with a mockable Meetup API provider', () => {
      service = createService({}, mockMeetupProvider);
    });

    describe('given no query string', () => {
      it('returns an object with a "data" key pointing to a non-empty array', async () => {
        mockMeetupProvider.getEvents
          .withArgs({group_id: midMichiganAgileGroupId})
          .resolves(mmagRawEvents);

        const result = await service.find();

        assert.ok(result.data);
        assert.equal(typeof result.data, 'object');
        assert.ok(result.data.length);
        assert.equal(result, mmagTransformedEvents);
      });
    });

    describe.skip('given a query string', () => {
      describe('when there are multiple events matching the query', () => {
        it('returns OK', () => {
          // TODO
          assert.fail('Not implemented');
        });

        it('returns an object with a "data" key pointing to a non-empty array', () => {
          // TODO
          assert.fail('Not implemented');
        });
      });

      describe.skip('when there is one event matching the query', () => {
        it('returns OK', () => {
          // TODO
          assert.fail('Not implemented');
        });

        it('returns an object with a "data" key pointing to an array containing one item', () => {
          // TODO
          assert.fail('Not implemented');
        });
      });

      describe.skip('when there are no events matching the query', () => {
        it('returns OK', () => {
          // TODO
          assert.fail('Not implemented');
        });

        it('returns an object with a "data" key pointing to an empty array', () => {
          // TODO
          assert.fail('Not implemented');
        });
      });
    });

    describe.skip('per group limit', () => {
      // TODO
    });
  });

  describe.skip('get', () => {
    // TODO
  });
});
