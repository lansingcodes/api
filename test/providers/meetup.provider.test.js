const assert = require('assert');
const meetupProvider = require('../../src/providers/meetup.provider');
const sinon = require('sinon');
const testData = require('../testData');

describe('Meetup API Provider', () => {
  const midMichiganAgileEventsResponse = testData.meetupApi.getMidMichiganAgileEvents();
  const midMichiganAgileEventResponse = testData.meetupApi.getMidMichiganAgileEvent();
  let mockMeetupApi, provider;

  beforeEach('Instantiate with mock API', () => {
    mockMeetupApi = {
      getEvents: sinon.mock(),
      getEvent: sinon.mock()
    };
    provider = meetupProvider(mockMeetupApi);
  });

  describe('getEvents', () => {
    it('returns a Promise', () => {
      mockMeetupApi.getEvents.returns({});

      const result = provider.getEvents();

      assert.ok(result.then);
    });

    it('passes parameters through to the API', () => {
      const params = {foo: 'bar'};
      mockMeetupApi.getEvents.withArgs(params);

      provider.getEvents(params);

      mockMeetupApi.getEvents.verify();
    });

    describe('when API successfully returns events', () => {
      it('resolves to a list of events', async () => {
        mockMeetupApi.getEvents = (parameters, callback) => {
          callback(undefined, midMichiganAgileEventsResponse);
        };

        const result = await provider.getEvents({foo: 'bar'});

        assert.equal(result, midMichiganAgileEventsResponse);
      });
    });

    describe('when API throws error', () => {
      it('rejects', async () => {
        const expectedError = new Error('oof');
        mockMeetupApi.getEvents = (parameters, callback) => {
          callback(expectedError, undefined);
        };

        try {
          await provider.getEvents({foo: 'bar'});
          assert.fail('System under test should have thrown. Fix your test setup.');
        } catch (error) {
          assert.equal(error, expectedError);
        }
      });
    });
  });

  describe('getEvent', () => {
    it('returns a Promise', () => {
      mockMeetupApi.getEvent.returns({});

      const result = provider.getEvent();

      assert.ok(result.then);
    });

    it('passes parameters through to the API', () => {
      const params = {foo: 'bar'};
      mockMeetupApi.getEvent.withArgs(params);

      provider.getEvent(params);

      mockMeetupApi.getEvent.verify();
    });

    describe('when API successfully returns event', () => {
      it('resolves to a single event object', async () => {
        mockMeetupApi.getEvent = (parameters, callback) => {
          callback(undefined, midMichiganAgileEventResponse);
        };

        const result = await provider.getEvent({foo: 'bar'});

        assert.equal(result, midMichiganAgileEventResponse);
      });
    });

    describe('when API throws error', () => {
      it('rejects', async () => {
        const expectedError = new Error('oof');
        mockMeetupApi.getEvent = (parameters, callback) => {
          callback(expectedError, undefined);
        };

        try {
          await provider.getEvent({foo: 'bar'});
          assert.fail('System under test should have thrown. Fix your test setup.');
        } catch (error) {
          assert.equal(error, expectedError);
        }
      });
    });
  });
});
