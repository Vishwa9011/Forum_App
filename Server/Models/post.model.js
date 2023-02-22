const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const PostSchema = mongoose.Schema({
     title: {
          type: String,
          required: true
     },
     description: {
          type: Boolean,
          required: true,
          default: false
     },
     content: {
          type: String,
          default: ''
     },
     likes: {
          type: [String],
          default: [],
     },
     comments: {
          type: [String],
          required: true,
          default: [],
     },
     isGoogleAuthenticated: {
          type: Boolean,
          required: true,
          default: false
     },
     ownerEmail: {
          type: String,
          immutable: true,
          required: true,
          lowercase: true
     },
     ownerID: {
          type: String,
          required: true
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
     token: { type: String },
})

PostSchema.methods.getAuthorizationToken = async function () {
     const token = await jwt.sign({ email: this.email }, process.env.SECRET_KEY);
     this.online = true;
     this.token = token;
     await this.save();
     return token;
}

const PostModel = mongoose.model('Post', PostSchema);

module.exports = { PostModel };