"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Creator = exports.CreatorSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _User = require("./User");

var _PersonalInformation = require("./PersonalInformation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var CreatorSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  creator_tag: {
    type: String,
    unique: true
  },
  personal_information: [{
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    birthday: {
      type: Date
    },
    address: {
      type: String
    }
  }],
  // personal_information: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'PersonalInformation'
  // },
  payment_information: {
    type: Schema.Types.ObjectId,
    ref: 'PaymentInformation'
  },
  bio: {
    type: String
  },
  projects: {
    type: [Schema.Types.ObjectId],
    ref: 'Project'
  },
  avatar: [{
    fieldname: {
      type: String
    },
    originalname: {
      type: String
    },
    name: {
      type: String
    },
    md5: {
      type: String
    },
    encoding: {
      type: String
    },
    mimetype: {
      type: String
    },
    destination: {
      type: String
    },
    filename: {
      type: String
    },
    path: {
      type: String
    },
    size: {
      type: Number
    },
    created_at: {
      type: Date,
      "default": Date.now
    }
  }]
});
exports.CreatorSchema = CreatorSchema;

CreatorSchema.statics.addProject = function (creator_id, project_id) {
  Creator.findOne({
    _id: creator_id
  }).exec(function (err, creator) {
    if (err || !creator) {
      return err;
    }

    creator.projects.push(project_id);
    creator.save();
  });
};

CreatorSchema.statics.deleteProject = function (creator_id, project_id) {
  Creator.findOne({
    _id: creator_id
  }).exec(function (err, creator) {
    if (err || !creator) {
      return;
    }

    creator.projects.filter(function (project) {
      return project != project_id;
    });
    creator.save();
  });
};

CreatorSchema.statics.getCreatorById = function (id) {
  Creator.findById(id, function (err, creator) {
    if (err) return err;
    return creator;
  });
};

CreatorSchema.statics.getCreatorByUserId = function (id, callback) {
  var query = Creator.where({
    user_id: id
  });
  query.find({
    'user_id': id
  }, 'id', callback);
};

CreatorSchema.plugin(_mongooseTimestamp["default"]);
CreatorSchema.index({
  createdAt: 1,
  updatedAt: 1
});

var Creator = _mongoose["default"].model('Creator', CreatorSchema); // module.exports = {
//     CreatorSchema,
//     Creator
// };


exports.Creator = Creator;