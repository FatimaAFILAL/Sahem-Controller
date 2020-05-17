"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _passport = _interopRequireDefault(require("passport"));

var _index = _interopRequireDefault(require("./app_api/routes/index"));

var _index2 = _interopRequireDefault(require("./app_server/routes/index"));

var _auth = _interopRequireDefault(require("./app_server/routes/auth"));

var _stripe = _interopRequireDefault(require("stripe"));

var _cors = _interopRequireDefault(require("cors"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); //connect to db


(0, _stripe["default"])(process.env.STRIPE_SECRET_KEY);

require('./app_api/models/db');

require('./app_api/config/passport'); //init app


var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev')); // app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

var fs = require('fs');

fs.readdir('upload', function (err, files) {
  files.forEach(function (file) {
    console.log(file);
  });
}); // let template = readFileSync(join(__dirname, '..', 'public', 'index.html')).toString();
// app.engine('html', (_, options, callback) => {
//     const opts = { document: template, url: options.req.url };
//     renderModuleFactory(AppServerModuleNgFactory, opts)
//         .then(html => callback(null, html));
// });
// app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public'))); // TOFO delete ../

app.use('/upload', _express["default"]["static"](_path["default"].join(__dirname, 'upload')));
app.use(_passport["default"].initialize());
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])()); //define routes

app.use('/', _index2["default"]);
app.use('/auth', _auth["default"]);
app.use('/api', _index["default"]); // app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../../Sahem-Views/Sahem-WA/Sahem/dist/Sahem/index.html'));
// });
//TODO route to get, create and edit creators info
// app.use('/creators', creatorsRouter);
//TODO route to edit user info
// app.use('/user', userRouter);
// app.use('/projects', projectsRouter);
// app.use('/register', registerRouter);

var _default = app;
exports["default"] = _default;