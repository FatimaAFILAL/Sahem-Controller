"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentInformation = exports.PaymentInformationSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var PaymentInformationSchema = new Schema({});
exports.PaymentInformationSchema = PaymentInformationSchema;
PaymentInformationSchema.plugin(_mongooseTimestamp["default"]);
PaymentInformationSchema.index({
  createdAt: 1,
  updatedAt: 1
});

var PaymentInformation = _mongoose["default"].model('PaymentInformation', PaymentInformationSchema);

exports.PaymentInformation = PaymentInformation;