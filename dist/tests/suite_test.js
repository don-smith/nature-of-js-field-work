'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _dalStore = require('../dal/store');

// There are better solutions for setting up fixtures with MongoDB.
// We'll just keep it fairly simple here...
before(function () {
  return _app2['default'].set('DB', 'field-test');
});
after(function () {
  return (0, _dalStore.connect)().then(function (db) {
    return db.dropDatabase();
  });
});