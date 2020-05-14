"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = exports.MessageSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var MessageSchema = new Schema({
  sent_time: {
    type: Date.now
  },
  receive_time: {
    type: Date
  },
  read_time: {
    type: Date
  },
  read_by: {
    type: [_mongoose["default"].Types.ObjectId],
    ref: 'Fundraiser'
  },
  delivered_to: {
    type: [_mongoose["default"].Types.ObjectId],
    ref: 'Fundraiser'
  },
  owner: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Fundraiser'
  }
});
exports.MessageSchema = MessageSchema;
MessageSchema.plugin(_mongooseTimestamp["default"]);
MessageSchema.index({
  createdAt: 1,
  updatedAt: 1
});

var Message = _mongoose["default"].model('Message', MessageSchema);

exports.Message = Message;