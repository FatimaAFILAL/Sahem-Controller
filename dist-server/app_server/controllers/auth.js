"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.register = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _User = require("./../../app_api/models/User/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var register = function register(req, res) {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      "message": "All fields required"
    });
  } //check if the password are matches DONE


  if (!(req.body.password === req.body.confirmPassword)) {
    return res.status(400).json({
      "message": "Password does not match"
    });
  } //TODO check if the user exist
  //TODO save the user in db DONE


  var username = req.body.username;
  var email = req.body.email;
  var user = new _User.User();
  user.username = username;
  user.email = email;
  user.setPassword(req.body.password);
  user.save(function (err) {
    if (err) {
      res.status(404).json(err);
    } else {
      var token = user.generateJwt();
      res.status(200).json({
        token: token
      });
    }
  });
};

exports.register = register;

var login = function login(req, res) {
  console.log(req.body);

  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      "message": "All fields required"
    });
  }

  _passport["default"].authenticate('local', function (err, user, info) {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user: user
      });
    }

    req.login(user, {
      session: false
    }, function (err) {
      console.log(err);

      if (err) {
        res.send(err);
      }

      var token = user.generateJwt();
      return res.json({
        token: token
      });
    });
  })(req, res);
}; // module.exports = {
//     register,
//     login
// };


exports.login = login;