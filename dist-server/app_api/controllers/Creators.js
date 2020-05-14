"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Creator = require("../models/User/Creator");

var _PersonalInformation = require("../models/User/PersonalInformation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const mongoose = require('mongoose');
// const Fundraiser = require('../models/User/fundraiser').Fundraiser;
var creatorsList = function creatorsList(req, res) {
  _Creator.Creator.find({}, '', function (error, creators) {
    if (error) {
      console.error(error);
    }

    if (Creators) {
      return res.status(200).send({
        creators: creators
      });
    } else {
      return res.status(404).send("not Found");
    }
  });
};

var creatorsCreate = function creatorsCreate(req, res) {
  //avatar
  var avatar = ''; // if (req.file) avatar = req.file;

  console.log(req.file);

  _Creator.Creator.create({
    user_id: req.user._id,
    creator_tag: req.body.creator_tag,
    bio: req.body.bio,
    avatar: req.file
  }, function (err, creator) {
    if (err) {
      res.status(404).json(err);
    } else {
      var personal_information = new _PersonalInformation.PersonalInformation();
      personal_information.first_name = req.body.first_name;
      personal_information.last_name = req.body.last_name;
      personal_information.address = req.body.address;
      personal_information.birthday = req.body.birthday;

      if (!personal_information.first_name || !personal_information.last_name || !personal_information.address || !personal_information.birthday) {
        return res.status(404).json({
          'message': 'all fields are required'
        });
      }

      personal_information.save(function (err, p_i) {
        if (err) {
          return res.status(201).json({
            err: err,
            creator: creator,
            'message': 'personal information has not been set'
          });
        } else {
          creator.personal_information = p_i._id;
          return res.status(201).json("creator created");
        }
      });
    }
  });
};

var creatorsUpdateOne = function creatorsUpdateOne(req, res) {
  _Creator.Creator.findById(req.creator._id).execc(function (err, creator) {
    if (err) {
      return res.status(404).json(err);
    }

    if (creator.user_id != req.user._id) {
      return res.status(401).json({
        'message': 'you are not the owner'
      });
    }

    if (!req.body.creator_tag && !req.body.bio) {
      return res.status(400).json({
        'message': 'you are required to  enter at least on field to edit'
      });
    }

    if (req.body.creator_tag) {
      creator.creator_tag = req.body.creator_tag;
    }

    if (req.body.bio) {
      creator.bio = req.body.bio;
    }

    if (req.files) {
      creator.avatar = req.file;
    }

    creator.save(function (err, creator) {
      if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(creator);
      }
    });
  });
};

var creatorsDeleteOne = function creatorsDeleteOne(req, res) {
  var creatorid = req.params.creatorid;

  if (creatorid) {
    _Creator.Creator.findByIdAndRemove(creatorid).exec(function (err, creator) {
      if (err) {
        return res.status(404).json(err);
      } // check if the creator owner match the creator of the current user


      if (creator.user_id != req.user._id) {
        return res.status(401).json({
          'message': 'you are not the owner of this creator'
        });
      }

      return res.status(204).json(null);
    });
  } else {
    return res.status(404).json({
      message: "This creator doesn't Exist"
    });
  }
}; // const creatorsReadOne = (req, res) => {
//     const { creatorid } = req.params;
//     const creator = Creator.getCreatorById(creatorid);
//     console.log(creator);
//     res.json({
//         creator
//     });
// };


var creatorsReadOne = function creatorsReadOne(req, res) {
  _Creator.Creator.findById(req.params.creatorid).exec(function (err, creator) {
    if (!creator) {
      return res.status(404).json({
        "message": "creator not found"
      });
    } else if (err) {
      return res.status(404).json(err);
    }

    return res.status(200).json(creator);
  });
};

var creatorsProfileRead = function creatorsProfileRead(req, res) {
  var userid = req.user._id.userid;

  var creator = _Creator.Creator.getCreatorByUserId(userid);

  res.json({
    creator: creator
  });
};

module.exports = {
  creatorsList: creatorsList,
  creatorsCreate: creatorsCreate,
  creatorsReadOne: creatorsReadOne,
  creatorsUpdateOne: creatorsUpdateOne,
  creatorsDeleteOne: creatorsDeleteOne,
  creatorsProfileRead: creatorsProfileRead
};