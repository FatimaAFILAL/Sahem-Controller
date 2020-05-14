"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalInformation = exports.PersonalInformationSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var PersonalInformationSchema = new Schema({
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: 'Creator'
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  birthday: {
    type: Date
  },
  address: {
    type: String
  }
});
exports.PersonalInformationSchema = PersonalInformationSchema;
PersonalInformationSchema.plugin(_mongooseTimestamp["default"]);
PersonalInformationSchema.index({
  createdAt: 1,
  updatedAt: 1
});

var PersonalInformation = _mongoose["default"].model('PersonalInformation', PersonalInformationSchema);

exports.PersonalInformation = PersonalInformation;