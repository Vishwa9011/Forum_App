const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const PostSchema = Schema({
     title: {
          type: String,
          required: true
     },
     description: {
          type: String,
          required: true,
     },
     content: {
          type: String,
     },
     likes: {
          type: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
          default: [],
     },
     comments: {
          type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
          required: true,
          default: [],
     },
     authorEmail: {
          type: String,
          immutable: true,
          required: true,
          lowercase: true
     },
     authorID: {
          type: Schema.Types.ObjectId,
          required: true,
          immutable: true
     },
     createdAt: {
          type: Number,
          immutable: true,
          default: () => Date.now()
     },
     updateAt: {
          type: Number,
          default: () => Date.now()
     },
     Edited: {
          type: Boolean,
          default: false
     }
})


const CommentSchema = Schema({
     postID: {
          type: Schema.Types.ObjectId,
          required: true,
          immutable: true
     },
     authorID: {
          type: Schema.Types.ObjectId,
          required: true,
          immutable: true
     },
     authorEmail: {
          type: String,
          required: true,
          immutable: true,
          lowercase: true
     },
     createdAt: {
          type: Number,
          required: true,
          immutable: true,
          default: () => Date.now()
     },
     Edited: {
          type: Boolean,
          default: false
     },
     Likes: [{ type: Schema.Types.ObjectId, ref: "CommentLike" }]
})

const CommentLikeSchema = Schema({

})


const LikesSchema = Schema({
     authorID: {
          type: Schema.Types.ObjectId,
          required: true,
          immutable: true
     },
     authorEmail: {
          type: String,
          required: true,
          immutable: true,
          lowercase: true
     },
})

const PostModel = model('Post', PostSchema);
const LikesModel = model('Like', LikesSchema);
const CommentModel = model('Comment', CommentSchema);
const CommentLikeModel = model('CommentLike', CommentLikeSchema);

module.exports = { PostModel, CommentModel, LikesModel, CommentLikeModel };