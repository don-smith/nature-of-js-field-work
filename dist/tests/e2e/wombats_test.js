'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var request = (0, _supertestAsPromised2['default'])(Promise)(_app2['default']);
var should = _chai2['default'].should();
var apiVersion = '1';

describe('Wombats (e2e):', function () {

  describe('GET /wombats', function () {

    it('should return a response as JSON', function () {
      return request.get('/api/v' + apiVersion + '/wombats').expect(200).then(function (res) {
        return res.header['content-type'].should.contain('application/json');
      });
    });
  });

  describe('POST /wombats', function () {

    it('should respond with object with correct properties', function () {
      return request.post('/api/v' + apiVersion + '/wombats').send({ name: "Gershwin" }).expect(201).then(function (res) {
        return res.body.should.include.keys('name', 'x', 'y', 'turn');
      });
    });

    it('should not allow wombats without a name', function () {
      return request.post('/api/v' + apiVersion + '/wombats').send({}).expect(400).then(function (res) {
        return res.body.error.should.equal("That mammal is invalid!");
      });
    });

    context('on turn 1', function () {
      before(function () {
        return _app2['default'].set('TURN', 1);
      });
      after(function () {
        return _app2['default'].set('TURN', 0);
      });

      it('should not allow wombats', function () {
        return request.post('/api/v' + apiVersion + '/wombats').send({ name: 'Thelonious' }).expect(400).then(function (res) {
          return res.body.error.should.equal("Can't add mammals after the round begins.");
        });
      });
    });

    context('with size 20', function () {
      var size = _app2['default'].get('MAP_SIZE');
      before(function () {
        return _app2['default'].set('MAP_SIZE', 20);
      });
      after(function () {
        return _app2['default'].set('MAP_SIZE', size);
      });

      it('should allow fixed coordinates to be specified', function () {
        return request.post('/api/v' + apiVersion + '/wombats').send({
          name: 'Ellington',
          locator: 'fixed',
          x: 19,
          y: 0
        }).expect(201);
      });

      it('should respond with an error if coordinates out of bounds', function () {
        return request.post('/api/v' + apiVersion + '/wombats').send({
          name: 'Coltrane',
          locator: 'fixed',
          x: 20,
          y: -1
        }).expect(400).then(function (res) {
          return res.body.error.should.equal("Out of bounds.");
        });
      });
    });
  });
});