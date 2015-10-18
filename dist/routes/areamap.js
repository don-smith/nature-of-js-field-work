'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _respond = require('./respond');

var respond = _interopRequireWildcard(_respond);

var _dalMammals = require('../dal/mammals');

var mammals = _interopRequireWildcard(_dalMammals);

var areaMap = _express2['default'].Router();

areaMap.route('/areamap')

// GET /map
.get(function (req, res) {
  mammals.getAll('rangers').then(function (rangers) {
    mammals.getAll('wombats').then(function (wombats) {
      respond.withAreaMap(res, rangers, wombats, req.query);
    }, function (err) {
      return respond.withError(res, err);
    });
  }, function (err) {
    return respond.withError(res, err);
  });
});

exports['default'] = areaMap;
module.exports = exports['default'];