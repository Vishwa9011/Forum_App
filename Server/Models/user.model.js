const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { PostModel, CommentModel, CommentLikeModel, LikesModel } = require("./post.model");
require("dotenv").config();

const userSchema = mongoose.Schema({
     username: {
          type: String,
          required: true
     },
     email: {
          type: String,
          immutable: true,
          required: true,
          lowercase: true
     },
     password: {
          type: String,
          default: ''
     },
     gender: {
          type: String
     },
     online: {
          type: Boolean,
          required: true,
          default: false
     },
     photoURL: {
          type: String,
          default: ''
     },
     phoneNumber: {
          type: Number,
          default: 0,
     },
     occupation: {
          type: String,
          default: "",
     },
     bio: {
          type: String,
          default: "",
     },
     role: {
          type: String,
          default: "USER",
          enum: ["USER", "ADMIN"]
     },
     isVerified: {
          type: Boolean,
          required: true,
          default: false
     },
     isGoogleAuthenticated: {
          type: Boolean,
          required: true,
          default: false
     },
     createdAt: {
          type: Number,
          immutable: true,
          default: () => Date.now()
     },
     lastLogin: {
          type: Number,
          default: () => Date.now()
     },
     token: {
          type: String
     },
     followerCount: {
          type: Number,
          required: true,
          default: 0,
     },
     followingCount: {
          type: Number,
          required: true,
          default: 0
     },
})

const FollowSchema = mongoose.Schema({
     userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true
     },
     followerID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true
     },
     followingID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true
     },
})

userSchema.methods.getAuthorizationToken = async function () {
     const token = jwt.sign({ email: this.email }, process.env.SECRET_KEY);
     this.online = true;
     this.token = token;
     await this.save();
     return token;
}

userSchema.methods.removeRecords = async function () {

     const userId = this._id

     await UserModel.findByIdAndDelete(userIds);

     await PostModel.deleteMany({ author: userId });

     await CommentModel.deleteMany({ author: userId });

     await CommentLikeModel.deleteMany({ author: userId });

     await LikesModel.deleteMany({ author: userId })

}

const UserModel = mongoose.model('user', userSchema);
const FollowModel = mongoose.model('follow', FollowSchema);

module.exports = { UserModel, FollowModel };