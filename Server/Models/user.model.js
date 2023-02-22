const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = mongoose.Schema({
     username: { type: String, required: true },
     email: {
          type: String,
          immutable: true,
          required: true,
          lowercase: true
     },
     password: { type: String, required: true },
     gender: { type: String, required: true },
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
     role: {
          type: String,
          required: true
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
     token: { type: String },
})

userSchema.methods.getAuthorizationToken = async function () {
     const token = await jwt.sign({ email: this.email }, process.env.SECRET_KEY);
     this.online = true;
     this.token = token;
     await this.save();
     return token;
}

const UserModel = mongoose.model('user', userSchema);

module.exports = { UserModel };