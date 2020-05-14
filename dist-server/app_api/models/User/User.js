"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.UserSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _crypto = _interopRequireDefault(require("crypto"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  emailIsConfirmed: {
    type: Boolean,
    "default": false
  },
  hash: {
    type: String,
    required: true,
    "default": ''
  },
  salt: {
    type: String,
    required: true,
    "default": ''
  }
});
exports.UserSchema = UserSchema;

UserSchema.methods.setPassword = function (password) {
  this.salt = _crypto["default"].randomBytes(16).toString('hex');
  this.hash = _crypto["default"].pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
  var hash = _crypto["default"].pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

  return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return _jsonwebtoken["default"].sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.JWT_SECRET);
};

UserSchema.plugin(_mongooseTimestamp["default"]);
UserSchema.index({
  createdAt: 1,
  updatedAt: 1
});

var User = _mongoose["default"].model('User', UserSchema); // module.exports = {
//     User,
//     UserSchema
// }


exports.User = User;