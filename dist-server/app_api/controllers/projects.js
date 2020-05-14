"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Project = require("../models/Content/Project");

var _Creator = require("../models/User/Creator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const Project = require('../models/Content/project').Project;
var projectsList = function projectsList(req, res) {
  _Project.Project.find({}, '', function (error, projects) {
    if (error) {
      console.error(error);
    }

    if (projects) {
      return res.status(200).send({
        projects: projects
      });
    } else {
      return res.status(404).send("Not Found");
    }
  });
};

var projectsCreate = function projectsCreate(req, res) {
  // const header_image = '';
  // if (req.files['header_image'][0]) {
  //     header_image = req.files['header_image'][0];
  // }
  // const thumbnail = '';
  // if (req.files['thumbnail'][0]) {
  //     thumbnail = req.files['thumbnail'][0];
  // }
  console.log(req.files);

  _Project.Project.create({
    owner: req.creator._id,
    title: req.body.title,
    category: req.body.category,
    content: req.body.content,
    description: req.body.description,
    fundGoal: req.body.fundGoal,
    endDate: req.body.endDate,
    // header_image: req.file,
    header_image: req.files['header_image'][0],
    thumbnail: req.files['thumbnail'][0]
  }, function (err, project) {
    if (err) {
      return res.status(404).json(err);
    } else {
      // const creator = Creator.findOne({ _id: req.creator._id });
      _Creator.Creator.addProject(req.creator._id, project._id);

      return res.status(201).json(project);
    }
  });
};

var projectsReadOne = function projectsReadOne(req, res) {
  _Project.Project.findById(req.params.projectid).exec(function (err, project) {
    if (!project) {
      return res.status(404).json({
        "message": "project not found"
      });
    } else if (err) {
      return res.status(404).json(err);
    }

    return res.status(200).json(project);
  });
};

var projectsUpdateOne = function projectsUpdateOne(req, res) {
  _Project.Project.findById(req.body.projectid).exec(function (err, project) {
    if (err) {
      return res.status(404).json(err);
    }

    if (project.owner != req.creator._id) {
      return res.status(401).json({
        'message': 'you are not the owner'
      });
    }

    if (req.body.description) {
      project.description = req.body.description;
    }

    if (req.body.category) {
      project.category = req.body.category;
    }

    if (req.body.content) {
      project.content = req.body.content;
    }

    if (req.body.category) {
      project.description = req.body.category;
    }

    if (req.body.fundGoal) {
      project.fundGoal = req.body.fundGoal;
    }

    if (req.body.category) {
      project.description = req.body.category;
    }

    var header_image = '';

    if (req.files['header_image'][0]) {
      project.header_image = req.files['header_image'][0];
    }

    var thumbnail = '';

    if (req.files['thumbnail'][0]) {
      project.thumbnail = req.files['thumbnail'][0];
    }

    project.save(function (err, proj) {
      if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(proj);
      }
    });
  });
};

var projectsDeleteOne = function projectsDeleteOne(req, res) {
  var projectid = req.params.projectid; //TODO delete project id from the creator's projects

  if (projectid) {
    _Project.Project.findByIdAndRemove({
      _id: projectid
    }).exec(function (err, project) {
      if (err) {
        return res.status(404).json(err);
      } // check if the project owner match the creator of the current user


      if (project.owner != req.creator._id) {
        return res.status(401).json({
          'message': 'you are not the owner of this project'
        });
      } // deleting project from creator projects


      _Creator.Creator.deleteProject(project.owner, project._id);

      return res.status(204).json(null);
    });
  } else {
    return res.status(404).json({
      message: "This Project doesn't Exist"
    });
  } // Loc
  //     .findById(locationid)
  //     .exec((err, location) => {
  //         // Do something with the document
  //         location.remove((err, loc) => {
  //             // Confirm success or failure
  //         });
  //     }
  //     );

};

module.exports = {
  projectsList: projectsList,
  projectsCreate: projectsCreate,
  projectsReadOne: projectsReadOne,
  projectsUpdateOne: projectsUpdateOne,
  projectsDeleteOne: projectsDeleteOne
};