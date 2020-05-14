"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = exports.PostSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _Vote = require("./Vote");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema; //Post schema

var PostSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Creator' // required: true

  },
  content: {
    type: String // required: true

  },
  postedOn: {
    type: Date,
    "default": Date.now()
  },
  votes: {
    type: [_Vote.VoteSchema]
  }
});
exports.PostSchema = PostSchema;

ProjectSchema.methods.addVote = function (upVote, owner) {
  this.votes.forEach(function (vote) {
    if (vote.owner == owner) {
      vote.upVote == upVote;
      return;
    }
  });
  vote = new Vote({
    upVote: upVote,
    owner: owner
  });
  this.votes.push(vote);
};

PostSchema.plugin(_mongooseTimestamp["default"]);
PostSchema.index({
  createdAt: 1,
  updatedAt: 1
});

var Post = _mongoose["default"].model("Post", postSchema);

exports.Post = Post;