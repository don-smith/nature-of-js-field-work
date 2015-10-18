'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.withAreaMap = withAreaMap;
exports.withDocument = withDocument;
exports.withError = withError;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function withAreaMap(res, rangers, wombats, query) {
  var turn = query.turn || _app2['default'].get('TURN');
  var me = query.me ? query.me.toLowerCase() : '';
  var areaMap = {
    "--": "",
    "key": "# = ranger  @ = you  W = wombat",
    "turn": turn
  };

  var grid = initGrid(areaMap, _app2['default'].get('MAP_SIZE'));
  _lodash2['default'].each(rangers, function (ranger) {
    return placeInGrid(ranger, grid, turn, me, '#');
  });
  _lodash2['default'].each(wombats, function (wombat) {
    return placeInGrid(wombat, grid, turn, me, 'W');
  });

  _lodash2['default'].each(grid, function (row, i) {
    areaMap[i] = i < 10 ? ' ' : '';
    _lodash2['default'].each(row, function (loc) {
      return draw(loc, areaMap, i);
    });
  });

  res.send(areaMap);
}

function withDocument(res, doc) {
  doc ? res.send(doc) : res.sendStatus(404);
}

function withError(res, err) {
  res.status(400).json({ error: err.message });
}

function initGrid(areaMap, size) {
  var grid = [];
  _lodash2['default'].times(size, function (i) {
    areaMap['--'] += i < 10 ? '  ' + i + ' ' : ' ' + i + ' ';

    var row = [];
    _lodash2['default'].times(size, function () {
      row.push(null);
    });
    grid.push(row);
  });
  return grid;
}

function placeInGrid(mammal, grid, turn, me, avatar) {
  avatar = mammal.name === me ? '@' : avatar;
  var x = mammal.x;
  var y = mammal.y;

  if (turn != _app2['default'].get('TURN')) {
    if (_lodash2['default'].has(mammal.history, turn)) {
      x = mammal.history[turn].x;
      y = mammal.history[turn].y;
    }
  }

  if (!grid[y][x]) grid[y][x] = [];
  grid[y][x].push(avatar);
}

function draw(loc, areaMap, i) {
  if (loc) {
    var s = _lodash2['default'].take(loc.sort().reverse(), 4).join('');
    areaMap[i] += _lodash2['default'].pad(s, 4, ' ');
  } else {
    areaMap[i] += '  - ';
  }
}