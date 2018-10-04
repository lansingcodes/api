var sinon = require('sinon');

describe('Events Controller', function () {
  var eventsController, eventsService, req, res;

  beforeEach('Instantiate all the things', function () {
    eventsService = require('../../src/services/events');
    eventsController = require('./../../controllers')(eventsService);
    req = sinon.fake();
    res = sinon.fake();
  });

  describe('Listing', function () {
    it('returns 200 OK status code', function () {
      fail();
    });

    describe('when results are found', function () {
      it('returns an object with a "data" key pointing to a non-empty array', function () {
        fail();
      });
    });

    describe('when no results are found', function () {
      it('returns an object with a "data" key pointing to an empty array', function () {
        fail();
      });
    });
  });

  describe('Search', function () {
    it('returns 200 OK status code', function () {
      fail();
    });

    describe('when results are found', function () {
      it('returns an object with a "data" key pointing to a non-empty', function () {
        fail();
      });
    });

    describe('when no results are found', function () {
      it('returns an object with a "data" key pointing to an empty array', function () {
        fail();
      });
    });
  });

});
