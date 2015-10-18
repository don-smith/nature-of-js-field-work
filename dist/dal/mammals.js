'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.create = create;
exports.get = get;
exports.getAll = getAll;
exports.update = update;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _dalStore = require('../dal/store');

var store = _interopRequireWildcard(_dalStore);

var _gamelogic = require('../gamelogic');

var logic = _interopRequireWildcard(_gamelogic);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// Assumes unique constraint on 'name'

function create(doc, collection) {
  return new Promise(function (resolve, reject) {
    try {
      doc.locator = doc.locator || 'random';
      logic.checkDocument(doc, collection);
      doc.name = doc.name.toLowerCase();
      doc.turn = 0;

      var _logic$locator = logic.locator(doc.locator)(doc);

      var _logic$locator2 = _slicedToArray(_logic$locator, 2);

      doc.x = _logic$locator2[0];
      doc.y = _logic$locator2[1];
    } catch (e) {
      return reject(e);
    }

    store.createDocument(doc, collection).then(resolve, reject);
  });
}

function get(name, collection) {
  return new Promise(function (resolve, reject) {
    store.getDocument(name, collection).then(resolve, reject);
  });
}

function getAll(collection) {
  return new Promise(function (resolve, reject) {
    store.getDocuments(collection).then(resolve, reject);
  });
}

function update(name, coords, collection) {
  return new Promise(function (resolve, reject) {
    get(name, collection).then(function (mammal) {
      return logic.checkMove(mammal, coords);
    }).then(function (mammal) {
      return logic.makeMove(mammal, coords);
    }).then(function (mammal) {
      store.updateDocument(mammal, collection).then(resolve, reject);
    })['catch'](reject);
  });
}