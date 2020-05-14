"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUser = exports.checkUserExist = exports.passwordCheck = exports.createUser = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _User = _interopRequireDefault(require("./../../app_api/models/User/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const User = mongoose.model('User');
var createUser = function createUser(req, res) {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      "message": "All fields required"
    });
  } //check if the password are matches


  if (!(req.body.password === req.body.confirmPassword)) {
    return res.status(400).json({
      "message": "Password does not match"
    });
  } //TODO check if the user exist
  // if (checkUserExist(req.body.email, req.body.username)) {
  //     return res
  //         .status(400)
  //         .json({
  //             message: 'User already registered.',
  //             messageClass: 'alert-danger'
  //         });
  // }
  //TODO save the user in db


  var user = new _User["default"]();
  user.username = req.body.username;
  user.email = req.body.email;
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

exports.createUser = createUser;

var passwordCheck = function passwordCheck(_ref) {
  var email = _ref.email,
      username = _ref.username,
      password = _ref.password,
      confirmPassword = _ref.confirmPassword;

  // check if the password == the confirmPassword
  if (password == confirmPassword) {
    checkUserExist({
      email: email,
      username: username,
      password: password
    });
  } else {
    res.json({
      message: 'Password does not match.',
      messageClass: 'alert-danger'
    });
  }
};

exports.passwordCheck = passwordCheck;

var checkUserExist = function checkUserExist(_ref2) {
  var email = _ref2.email,
      username = _ref2.username;

  //find out if the user already exist in the database
  //find by username
  _User["default"].findOne({
    username: username
  }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (user) {
      return done(null, false, {
        message: 'Username already in use.'
      });
    }
  });

  _User["default"].findOne({
    email: email
  }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (user) {
      return done(null, false, {
        message: 'Email already in use.'
      });
    }
  });
};

exports.checkUserExist = checkUserExist;

var saveUser = function saveUser(_ref3) {
  var email = _ref3.email,
      username = _ref3.username,
      password = _ref3.password;
  //TODO hash the password then push
  // Store user into the database if you are using one
  res.json({
    message: 'Registration Complete. Please login to continue.',
    messageClass: 'alert-success'
  });
}; // module.exports = {
//     createUser
// };


exports.saveUser = saveUser;