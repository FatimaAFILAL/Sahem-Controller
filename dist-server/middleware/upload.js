"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;

var _util = _interopRequireDefault(require("util"));

var _multer = _interopRequireDefault(require("multer"));

var _multerGridfsStorage = _interopRequireDefault(require("multer-gridfs-storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var url = process.env.DB_URL;

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, __dirname + '/../../upload/');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
}); // const storage = new GridFsStorage({
//     url: 'mongodb://localhost/sahem',
//     // options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         const match = ["image/png", "image/jpeg"];
//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-sahem-${file.originalname}`;
//             return filename;
//         }
//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-sahem-${file.originalname}`
//         };
//     }
// });


var upload = (0, _multer["default"])({
  storage: storage
}); // const uploadFilesMiddleware = util.promisify(upload);
// module.exports = {
//     upload
// };

exports.upload = upload;