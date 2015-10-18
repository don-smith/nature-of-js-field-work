'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _dalMammals = require('../dal/mammals');

var mammals = _interopRequireWildcard(_dalMammals);

var _gamelogic = require('../gamelogic');

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Mammals:', function () {

  describe('mammals.create', function () {

    it('should refuse to create a mammal without a name', function () {
      var p = mammals.create({}, 'rangers');
      return p.should.be.rejectedWith(Error);
    });

    it('should create an object with the correct properties', function () {
      var p = mammals.create({ name: 'Thelonious' }, 'rangers');
      return p.should.eventually.include.keys('name', 'x', 'y', 'turn');
    });

    context('on turn 1', function () {
      before(function () {
        return _app2['default'].set('TURN', 1);
      });
      after(function () {
        return _app2['default'].set('TURN', 0);
      });

      it('should refuse to create a mammal', function () {
        var p = mammals.create({ name: 'Gershwin' }, 'rangers');
        return p.should.be.rejectedWith(Error);
      });
    });

    context('with map size 20', function () {
      var size = _app2['default'].get('MAP_SIZE');
      before(function () {
        return _app2['default'].set('MAP_SIZE', 20);
      });
      after(function () {
        return _app2['default'].set('MAP_SIZE', size);
      });

      it('should create a wombat with fixed coordinates', function () {
        var p = mammals.create({
          name: 'Ellington',
          locator: 'fixed',
          x: 19,
          y: 0
        }, 'wombats');

        return Promise.all([p.should.eventually.have.property('x').which.equals(19), p.should.eventually.have.property('y').which.equals(0)]);
      });

      it('should not create a ranger with fixed coordinates', function () {
        var p = mammals.create({
          name: 'Coltrane',
          locator: 'fixed',
          x: 19,
          y: 0
        }, 'rangers');
        return p.should.be.rejectedWith(Error);
      });

      it('should not create a wombat out of bounds', function () {
        var p = mammals.create({
          name: 'Basie',
          locator: 'fixed',
          x: 20,
          y: -1
        }, 'wombats');
        return p.should.be.rejectedWith(Error);
      });
    });
  });
});