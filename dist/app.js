'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routesRangers = require('./routes/rangers');

var _routesRangers2 = _interopRequireDefault(_routesRangers);

var _routesWombats = require('./routes/wombats');

var _routesWombats2 = _interopRequireDefault(_routesWombats);

var _routesAreamap = require('./routes/areamap');

var _routesAreamap2 = _interopRequireDefault(_routesAreamap);

var _routesRounds = require('./routes/rounds');

var _yargs = require('yargs');

var app = (0, _express2['default'])();

// output (nb: must come before app.use(... routes))
app.use(_bodyParser2['default'].json());

// cors
app.use(function (req, res, next) {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'get,put,post,delete,options');
  res.header('access-control-allow-headers', 'origin, x-requested-with, content-type, accept, authentication, content-length');

  if ('options' === req.method) {
    res.sendstatus(200);
  }

  next();
});

// prefix
app.use('/api/v1', _routesRangers2['default']);
app.use('/api/v1', _routesWombats2['default']);
app.use('/api/v1', _routesAreamap2['default']);

// static files in public
app.use('/', _express2['default']['static'](_path2['default'].join(__dirname, 'public')));

// Map is square, default size is 20x20
app.set('MAP_SIZE', _yargs.argv.size || 20);
app.set('RANGERS', _yargs.argv.rangers || 10);
app.set('WOMBATS', _yargs.argv.wombats || 5);
app.set('ROUND_LENGTH', _yargs.argv.turns || 10);
app.set('TURN', 0);
app.set('ROUND_ACTIVE', true);
app.set('DB', 'field-work');

exports['default'] = app;
module.exports = exports['default'];