"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Conversation = exports.ConversationSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var ConversationSchema = new Schema({
  messages: {
    type: [Schema.Types.ObjectId],
    ref: 'Message'
  },
  participants: {
    type: [Schema.Types.ObjectId],
    ref: 'Fundraiser'
  }
});
exports.ConversationSchema = ConversationSchema;
ConversationSchema.plugin(_mongooseTimestamp["default"]);
ConversationSchema.index({
  createdAt: 1,
  updatedAt: 1
});

var Conversation = _mongoose["default"].model('Conversation', ConversationSchema);

exports.Conversation = Conversation;