'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var port = process.env.PORT || 5000;
var ip = process.env.IP || '0.0.0.0';
_app2['default'].listen(port, ip, function () {
  console.log('listening on ' + ip + ':' + port);
});