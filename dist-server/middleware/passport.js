"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = require("../app_api/models/User/User");

var JwtStrategy = require('passport-jwt').Strategy;

var ExtractJwt = require('passport-jwt').ExtractJwt;

require('dotenv').config();

// To authtenticate the User by JWT Startegy
var _default = function _default(passport) {
  var opts = {
    // jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }; // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  // opts.secretOrKey  = process.env.JWT_SECRET;

  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    _User.User.findById(jwt_payload._id, function (err, user) {
      if (err) return done(err, false);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    });
  }));
};

exports["default"] = _default;