"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vote = exports.VoteSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const FundRaiser = require('../User/fundraiser');
var Schema = _mongoose["default"].Schema;
var VoteSchema = new Schema({
  upVote: {
    type: Boolean,
    required: true
  },
  // timeOfVote: {
  //     type: Date,
  //     default: Date.now
  // },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Creator'
  }
});
exports.VoteSchema = VoteSchema;
VoteSchema.plugin(_mongooseTimestamp["default"]);
VoteSchema.index({
  createdAt: 1,
  updatedAt: 1
});

var Vote = _mongoose["default"].model("Vote", VoteSchema);

exports.Vote = Vote;