"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _User = require("../../app_api/models/User/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = function login(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      "message": "All fields required"
    });
  }

  _passport["default"].authenticate('local', function (err, user, info) {
    var token;

    if (err) {
      return res.status(404).json(err);
    }

    if (user) {
      token = user.generateJwt();
      res.status(200).json({
        token: token
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
}; // module.exports = {
//     login
// };


exports.login = login;