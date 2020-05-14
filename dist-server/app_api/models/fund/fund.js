"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fund = exports.FundSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var FundSchema = new Schema({
  funder: {
    type: Schema.Types.ObjectId,
    ref: 'Creator' // required: true

  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project' // required: true

  },
  amount: {
    type: Number // required: true

  },
  customer: {},
  charge: {}
});
exports.FundSchema = FundSchema;
FundSchema.plugin(_mongooseTimestamp["default"]);
FundSchema.index({
  createdAt: 1,
  updatedAt: 1
});

var Fund = _mongoose["default"].model("Fund", FundSchema); // module.exports = {
//     Fund,
//     FundSchema
// };


exports.Fund = Fund;