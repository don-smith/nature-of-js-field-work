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

var _gamelogic = require('../gamelogic');

var _rounds = require('./rounds');

var wombats = _express2['default'].Router();

// disallow PUT if round is over
wombats.put('/wombats/:name', _rounds.checkRoundStatus);

wombats.route('/wombats')

// GET /wombats
.get(function (req, res) {
  mammals.getAll('wombats').then(function (wombats) {
    return res.send(wombats);
  }, function (err) {
    return respond.withError(res, err);
  });
})

// POST /wombats
.post(function (req, res) {
  mammals.create(req.body, 'wombats').then(function (wombat) {
    return res.status(201).send(wombat);
  }, function (err) {
    return respond.withError(res, err);
  });
});

wombats.route('/wombats/:name')

// PUT /wombats/bartholemew
.put(function (req, res) {
  mammals.update(req.params.name, req.body, 'wombats').then(function (result) {
    return (0, _gamelogic.incrementTurn)().then(res.send(result));
  }, function (err) {
    return respond.withError(res, err);
  });
});

exports['default'] = wombats;
module.exports = exports['default'];