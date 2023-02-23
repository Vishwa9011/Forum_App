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
     likes: [
          { type: Schema.Types.ObjectId, ref: 'Like', default: [] }
     ],
     comments: [
          { type: Schema.Types.ObjectId, ref: 'Comment', default: [] }
     ],
     author: {
          type: Schema.Types.ObjectId,
          required: true,
          immutable: true
     },
     authorID: {
          type: String,
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
     edited: {
          type: Boolean,
          default: false
     }
})


const CommentSchema = Schema({
     message: {
          type: String,
          required: true
     },
     postID: {
          type: Schema.Types.ObjectId,
          required: true,
          immutable: true
     },
     author: {
          type: Schema.Types.ObjectId,
          ref: "user",
          // required: true,
          immutable: true
     },
     authorID: {
          type: String,
          // required: true,
          immutable: true
     },
     createdAt: {
          type: Number,
          required: true,
          immutable: true,
          default: () => Date.now()
     },

     parent: {
          type: Schema.Types.ObjectId,
          immutable: true,
     },

     parentID: {
          type: String,
          immutable: true,
          default: null
     },

     child: [
          { type: Schema.Types.ObjectId, ref: 'Comment', default: [] }
     ],

     edited: {
          type: Boolean,
          default: false
     },

     likes: [
          { type: Schema.Types.ObjectId, ref: 'CommentLike', default: [] }
     ]

})

const CommentLikeSchema = Schema({
     author: {
          type: Schema.Types.ObjectId,
          required: true,
          immutable: true
     },
     authorID: {
          type: String,
          required: true,
          immutable: true
     }
})


const LikesSchema = Schema({
     author: {
          type: Schema.Types.ObjectId,
          required: true,
          immutable: true
     },
     authorID: {
          type: String,
          required: true,
          immutable: true
     }
})

const PostModel = model('Post', PostSchema);
const LikesModel = model('Like', LikesSchema);
const CommentModel = model('Comment', CommentSchema);
const CommentLikeModel = model('CommentLike', CommentLikeSchema);

module.exports = { PostModel, CommentModel, LikesModel, CommentLikeModel };