"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCreator = void 0;

var _Creator = require("../app_api/models/User/Creator");

/**
 * This function get the creator associated with the user id 
 * that we got after authenticating with passport 
 * @param {Http request} req holds the user id in req.user._id
 * @param {Http response} res 
 */
var getCreator = function getCreator(req, res, next) {
  var userId = req.user._id; // console.log("dasdsad");

  var ObjectId = require('mongoose').Types.ObjectId;

  _Creator.Creator.findOne({
    user_id: userId
  }).exec(function (err, creator) {
    //if(err) error creator not created yet
    if (err) {
      return res.status(400).json({
        'message': 'you didn\'t create your profile yet'
      });
    }

    if (!creator) {
      return res.status(404).json({
        'message': 'creator doesn\'t exist'
      });
    }

    req.creator = creator;
    next();
  });
}; // module.exports = {
//     getCreator
// }


exports.getCreator = getCreator;