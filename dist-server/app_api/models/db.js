"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dbURI = process.env.DB_URL; // const dbURI = 'mongodb://localhost/sahem';

_mongoose["default"].set('useCreateIndex', true);

_mongoose["default"].connect(dbURI, {
  useNewUrlParser: true
});

_mongoose["default"].connection.on('connected', function () {
  console.log("Mongoose connected to ".concat(dbURI));
});

_mongoose["default"].connection.on('error', function (err) {
  console.log("Mongoose connection error: ".concat(err));
});

_mongoose["default"].connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

var gracefulShutdown = function gracefulShutdown(msg, callback) {
  _mongoose["default"].connection.close(function () {
    console.log("Mongoose disconnected through ".concat(msg));
    callback();
  });
};