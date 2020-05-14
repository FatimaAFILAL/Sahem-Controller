"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comment = exports.CommentSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _Vote = _interopRequireDefault(require("./Vote"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var CommentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Creator'
  },
  content: {
    type: String
  },
  votes: {
    type: [_Vote["default"]]
  },
  origin_post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  origin_project: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  } // origin_comment: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Comment'
  // },
  // subcomments_count: {
  //     type: Number,
  //     default: 0
  // }

});
exports.CommentSchema = CommentSchema;

CommentSchema.methods.addVote = function (upVote, owner) {
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

CommentSchema.plugin(_mongooseTimestamp["default"]);
CommentSchema.index({
  createdAt: 1,
  updatedAt: 1
});

var Comment = _mongoose["default"].model('Comment', CommentSchema);

exports.Comment = Comment;