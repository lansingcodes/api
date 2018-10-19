const assert = require('assert');
const app = require('../../src/app');

describe('\'events\' service', () => {
  const service = app.service('events');

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  describe('find', () => {
    describe('given no query string', () => {
      it('returns an object with a "data" key pointing to a non-empty array', () => {
        return service.find().then(data => {
          assert.ok(data);
          assert.equal('object', typeof data);
          assert.ok(data.length);
        });
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
  });

  describe('get', () => {
    // TODO
  });
});
