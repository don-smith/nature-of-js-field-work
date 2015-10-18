'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.incrementTurn = incrementTurn;
exports.checkDocument = checkDocument;
exports.checkMove = checkMove;
exports.makeMove = makeMove;
exports.locator = locator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _dalMammals = require('./dal/mammals');

var _dalMammals2 = _interopRequireDefault(_dalMammals);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// Increment the turn if no mammals are yet to move

function incrementTurn() {
  var turn = _app2['default'].get('TURN');

  return new Promise(function (resolve, reject) {
    _dalMammals2['default'].getAll('rangers').then(function (rangers) {
      if (turnInProgress(rangers, 'RANGERS', turn)) {
        return resolve();
      }
      _dalMammals2['default'].getAll('wombats').then(function (wombats) {
        if (!turnInProgress(wombats, 'WOMBATS', turn)) {
          if (turn + 1 === _app2['default'].get('ROUND_LENGTH')) {
            _app2['default'].set('ROUND_ACTIVE', false);
          } else {
            _app2['default'].set('TURN', turn + 1);
          }
        }
        resolve();
      });
    });
  });
}

function turnInProgress(collection, type, turn) {
  if (collection.length < _app2['default'].get(type)) return true;
  return _lodash2['default'].some(_lodash2['default'].map(collection, 'turn'), function (t) {
    return t === turn;
  });
}

function checkDocument(doc, collection) {
  if (_app2['default'].get('TURN') !== 0) {
    throw Error("Can't add mammals after the round begins.");
  }
  if (!doc.hasOwnProperty('name')) {
    throw Error("That mammal is invalid!");
  }
  if (doc.locator === 'fixed' && collection !== 'wombats') {
    throw Error("Only wombats can have fixed positions.");
  }
}

function checkMove(mammal, coords) {
  return new Promise(function (resolve, reject) {
    if (!mammal) {
      return reject(Error("Don't recognise that mammal."));
    }
    if (mammal.history) {
      if (mammal.history.hasOwnProperty(_app2['default'].get('TURN').toString())) {
        return reject(Error(mammal.name + ' has already moved this turn.'));
      }
    }
    // No jumps of more than one space at a time
    if (Math.abs(mammal.x - coords.x) > 1 || Math.abs(mammal.y - coords.y) > 1) {
      return reject(Error("Only allowed to move 1 space at a time."));
    }
    var max = _app2['default'].get('MAP_SIZE') - 1;
    if (coords.x > max || coords.y > max) {
      return reject(Error("Out of bounds."));
    }
    if (coords.x < 0 || coords.y < 0) {
      return reject(Error("Out of bounds."));
    }

    resolve(mammal);
  });
}

function makeMove(mammal, coords) {
  var turn = _app2['default'].get('TURN');
  if (turn === 0) mammal.history = {};
  mammal.history[turn] = { x: mammal.x, y: mammal.y };
  mammal.turn = turn + 1;
  mammal.x = coords.x;
  mammal.y = coords.y;
  return mammal;
}

function locator(type) {
  switch (type) {
    case 'fixed':
      return fixedLocation;
    default:
      return randomLocation;
  }
}

function randomLocation() {
  var max = _app2['default'].get('MAP_SIZE') - 1;
  return [_lodash2['default'].random(0, max), _lodash2['default'].random(0, max)];
}

function fixedLocation(doc) {
  var max = _app2['default'].get('MAP_SIZE') - 1;
  if (!Number.isInteger(doc.x) || !Number.isInteger(doc.y)) {
    throw Error("Specify coordinates.");
  }
  if (doc.x < 0 || doc.x > max || doc.y < 0 || doc.y > max) {
    throw Error("Out of bounds.");
  }
  return [doc.x, doc.y];
}