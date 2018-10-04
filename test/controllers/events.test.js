var assert = require('chai').assert;
var sinon = require('sinon');

describe('Events Controller', function () {
  var eventsController, eventsService, req, res;

  beforeEach('Instantiate all the things', function () {
    var eventsService = require('./../../src/services/events');
    var eventsController = require('./../../src/controllers/events');
    req = sinon.fake();
    res = sinon.fake();
  });

  describe('Listing', function () {
    it('returns 200 OK status code', function () {
      assert.fail();
    });

    describe('when results are found', function () {
      it('returns an object with a "data" key pointing to a non-empty array', function () {
        assert.fail();
      });
    });

    describe('when no results are found', function () {
      it('returns an object with a "data" key pointing to an empty array', function () {
        assert.fail();
      });
    });
  });

  describe('Search', function () {
    it('returns 200 OK status code', function () {
      assert.fail();
    });

    describe('when results are found', function () {
      it('returns an object with a "data" key pointing to a non-empty', function () {
        assert.fail();
      });
    });

    describe('when no results are found', function () {
      it('returns an object with a "data" key pointing to an empty array', function () {
        assert.fail();
      });
    });
  });

});
