const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
     username: { type: String, required: true },
     email: { type: String, required: true, lowercase: true },
     password: { type: String, required: true },
     online: { type: Boolean, required: true },
     gender: { type: String, required: true },
     photoURL: { type: String, required: true },
     phoneNumber: { type: Number, required: true },
     isVerified: { type: Boolean, required: true },
     isGoogleAuthenticated: { type: Boolean, required: true },
     createdAt: {
          type: Date,
          immutable: true,
          default: () => Date.now()
     },
     lastLogin: {
          type: Date,
          default: () => Date.now()
     }
})

const UserModel = mongoose.model('user', userSchema);

module.exports = { UserModel };