"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fundsCreate = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _fund = require("../models/fund/fund");

var _Project = require("../models/Content/Project");

var _stripe = _interopRequireDefault(require("stripe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _stripe["default"])(process.env.STRIPE_SECRET_KEY); // const Project = mongoose.model("Project");

var fundsCreate = function fundsCreate(req, res) {
  //avatar
  // if (req.file) avatar = req.file;
  // TODO check req.params.projectid if it's a real project and the project exist
  // Project
  //     .findById(req.body.projectid)
  //     .exec((err, project) => {
  //         if (err) {
  //             return res
  //                 .status(404)
  //                 .json(err);
  //         }
  //     });
  console.log('you are here now'); // TODO charge if successful create Fund

  _fund.Fund.create({
    funder: req.creator._id,
    project: req.params.projectid,
    amount: req.body.amount,
    customer: req.customer,
    charge: req.charge
  }, function (err, fund) {
    if (err) {
      res.status(404).json(err);
    } else {
      // TODO add fund to the project
      _Project.Project.findById(req.body.projectid).exec(function (err, project) {
        if (err) {
          return res.status(404).json(err);
        }

        console.log({
          proj: proj
        });
        project.funders.push(fund);
        project.save(function (err, proj) {
          if (err) {
            return res.status(404).json(err);
          } else {
            // console.log({ fund, proj });
            return res.status(200).json({
              fund: fund,
              proj: proj
            });
          }
        });
      });
    }
  });
}; // module.exports = {
//     fundsCreate
// };


exports.fundsCreate = fundsCreate;