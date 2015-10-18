'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.checkRoundStatus = checkRoundStatus;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

// router middleware checks round status prior to allowing game activity

function checkRoundStatus(req, res, next) {
  if (_app2['default'].get('ROUND_ACTIVE')) {
    next();
  } else {
    res.status(400).json({ message: "Round is over!" });
  }
}