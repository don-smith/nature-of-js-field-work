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

var rangers = _express2['default'].Router();

// disallow PUT requests if round is over
rangers.put('/rangers/:name', _rounds.checkRoundStatus);

rangers.route('/rangers')

// GET /rangers
.get(function (req, res) {
  mammals.getAll('rangers').then(function (rangers) {
    return res.send(rangers);
  }, function (err) {
    return respond.withError(res, err);
  });
})

// POST /rangers
.post(function (req, res) {
  mammals.create(req.body, 'rangers').then(function (ranger) {
    return res.status(201).send(ranger);
  }, function (err) {
    return respond.withError(res, err);
  });
});

rangers.route('/rangers/:name')

// GET /rangers/bartholemew
.get(function (req, res) {
  mammals.get(req.params.name, 'rangers').then(function (ranger) {
    return respond.withDocument(res, ranger);
  }, function (err) {
    return respond.withError(res, err);
  });
})

// PUT /rangers/bartholemew
.put(function (req, res) {
  mammals.update(req.params.name, req.body, 'rangers').then(function (result) {
    return (0, _gamelogic.incrementTurn)().then(res.send(result));
  }, function (err) {
    return respond.withError(res, err);
  });
});

exports['default'] = rangers;
module.exports = exports['default'];