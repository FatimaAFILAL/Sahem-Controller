"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../../app_api/models/User/User"));

var _auth = require("../controllers/auth");

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import bodyParser from 'body-parser';
var router = _express["default"].Router(); // router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));


var jsonParser = _bodyParser["default"].json({
  limit: '50mb'
});

var urlParser = _bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}); //Auth Routes


router.route('/register').post(jsonParser, urlParser, function (req, res) {
  (0, _auth.register)(req, res); // ctrlAuth.register(req, res);
});
router.route('/login').post(jsonParser, urlParser, function (req, res) {
  (0, _auth.login)(req, res); // ctrlAuth.login(req, res);
}); //create a forgot password
//end of Auth Routes

var _default = router;
exports["default"] = _default;