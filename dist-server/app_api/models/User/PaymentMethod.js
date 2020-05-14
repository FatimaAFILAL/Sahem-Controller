"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentMethod = exports.PaymentMethodSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var PaymentMethodSchema = new Schema({});
exports.PaymentMethodSchema = PaymentMethodSchema;
PaymentMethodSchema.plugin(_mongooseTimestamp["default"]);
PaymentMethodSchema.index({
  createdAt: 1,
  updatedAt: 1
});

var PaymentMethod = _mongoose["default"].model('PaymentMethod', PaymentMethodSchema);

exports.PaymentMethod = PaymentMethod;