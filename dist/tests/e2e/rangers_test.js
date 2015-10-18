'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

// supertest-as-promised defaults to Bluebird promises:
// use es6 instead
var request = (0, _supertestAsPromised2['default'])(Promise)(_app2['default']);
var should = _chai2['default'].should();
var apiVersion = '1';

describe('Rangers (e2e):', function () {

  describe('GET /rangers', function () {

    it('should return a response as JSON', function () {
      return request.get('/api/v' + apiVersion + '/rangers').expect(200).then(function (res) {
        return res.header['content-type'].should.contain('application/json');
      });
    });
  });

  describe('POST /rangers', function () {

    it('should respond with object with correct properties', function () {
      return request.post('/api/v' + apiVersion + '/rangers').send({ name: "Gershwin" }).expect(201).then(function (res) {
        return res.body.should.include.keys('name', 'x', 'y', 'turn');
      });
    });

    it('should not allow rangers without a name', function () {
      return request.post('/api/v' + apiVersion + '/rangers').send({}).expect(400).then(function (res) {
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

      it('should not allow rangers', function () {
        return request.post('/api/v' + apiVersion + '/rangers').send({ name: 'Thelonious' }).expect(400).then(function (res) {
          return res.body.error.should.equal("Can't add mammals after the round begins.");
        });
      });
    });
  });

  describe('GET /rangers/:name', function () {

    before(function () {
      return request.post('/api/v' + apiVersion + '/rangers').send({ name: 'Ellington' });
    });

    it('should retrieve a mammal by name', function () {
      return request.get('/api/v' + apiVersion + '/rangers/ellington').expect(200).then(function (res) {
        return res.body.name.should.equal('ellington');
      });
    });
  });
});