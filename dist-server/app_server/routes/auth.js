"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../../app_api/models/User/User"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use(_bodyParser["default"].json());
router.use(_bodyParser["default"].urlencoded({
  extended: true
})); //Auth Routes

router.route('/register').post(function (req, res) {
  _auth["default"].register(req, res);
});
router.route('/login').post(function (req, res) {
  _auth["default"].login(req, res);
}); //create a forgot password
//end of Auth Routes

var _default = router;
exports["default"] = _default;