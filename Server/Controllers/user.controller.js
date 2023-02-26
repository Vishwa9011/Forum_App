require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const nodemailer = require("nodemailer");
const { Email_template } = require("../helper/EmaiL.template");
const { UserModel, FollowModel } = require("../Models/user.model");

async function UserDetail(req, res) {
     const id = req.params.id;
     try {
          const user = await UserModel.findById(id)
          res.status(200).json({ msg: "user details fetched", credentials: user })
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}


async function UserQuery(req, res) {
     const { user } = req.query;
     console.log('user: ', user);
     try {
          const FindUser = await UserModel.find({
               $or: [
                    { username: { $regex: user || "", $options: 'i' } },
                    { email: { $regex: user || "", $options: 'i' } }
               ]
          })
          res.status(200).json({ msg: "user details fetched", users: FindUser })
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

// ** User Registeration
async function UserRegisteration(req, res) {
     const { password, ...payload } = req.body;
     try {
          const CheckUser = await UserModel.findOne({ email: payload.email })

          if (CheckUser) return res.status(400).json({ message: "User already exist" })

          const hash = await bcrypt.hash(password, 5);

          const user = new UserModel({ ...payload, password: hash });

          await user.save();

          res.status(201).json({ status: 200, message: "registeration success", credentials: user })
     } catch (error) {
          // console.log('error: ', error);
          res.send(error)
     }
}

// * Google Authentication
async function GoogleAuth(req, res) {
     const payload = req.body;
     try {
          const CheckUser = await UserModel.findOne({ email: payload.email })
          if (CheckUser) {
               const token = await CheckUser.getAuthorizationToken();
               return res.status(201).json({ status: 200, message: "login success", credentials: CheckUser, token })
          } else {

               const user = new UserModel({ ...payload, isGoogleAuthenticated: true, online: true, isVerified: true, password: "" });

               const token = await jwt.sign({ email: payload.email }, process.env.SECRET_KEY);

               user.token = token;

               await user.save();

               res.status(201).json({ status: 200, message: "GoogleAuth success", credentials: user, token })
          }
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

// * login user
async function UserLogin(req, res) {
     const { password, email } = req.body;
     try {
          const user = await UserModel.findOne({ email })
          if (user) {
               const isMatched = await bcrypt.compare(password, user.password);
               if (isMatched) {
                    const token = await user.getAuthorizationToken();
                    res.status(201).json({ status: 200, message: "Login Success", credentials: user, token })
               } else {
                    res.status(201).json({ status: 401, message: "password not matched" })
               }
          } else {
               res.status(201).json({ status: 400, message: "user not found." })
          }
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

// * logging out the user
async function UserLogout(req, res) {
     const { email } = req.body;
     try {
          const user = await UserModel.findOne({ email })
          if (user) {
               user.lastLogin = Date.now();
               user.online = false;
               await user.save()
               res.status(201).json({ status: 200, message: "Logout Success" })
          } else {
               res.status(201).json({ status: 400, message: "user not found." })
          }
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

// * sending the verification email to the user email
async function sentVerificationEmail(req, res) {
     const { email, password } = req.body;

     try {
          const transporter = nodemailer.createTransport({
               service: "gmail",
               auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASS
               }
          })

          const EncryptedCredential = jwt.sign({ email, password }, process.env.VERIFICATION_SECRET_KEY, {
               expiresIn: '1h'
          })

          const mailOptions = {
               from: process.env.EMAIL,
               to: email,
               subject: "sent verification mail",
               html: Email_template("http://localhost:5173/verifyemail", EncryptedCredential)
          }

          transporter.sendMail(mailOptions, (err, info) => {
               if (err) {
                    res.status(403).json({ message: "Please try again. after some time", err });
               } else {
                    res.status(201).json({ status: 201, info });
               }
          })

          res.status(201).json({ status: 200, EncryptedCredential })
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

// * verify email after clicking on email button;
async function verifyEmail(req, res) {
     const { credential } = req.body;
     // console.log('credential: ', credential);
     try {
          const decode = jwt.verify(credential, process.env.VERIFICATION_SECRET_KEY)
          // console.log('decode: ', decode.password);
          if (decode) {
               const user = await UserModel.findOne({ email: decode.email });
               if (user) {
                    if (user.password == decode.password) {
                         user.isVerified = true;
                         const token = await user.getAuthorizationToken();
                         return res.status(201).json({ status: 200, message: 'Email has been verified', credentials: user, token })
                    } else {
                         return res.status(201).json({ status: 403, message: 'Wrong credential' })
                    }
               } else {
                    return res.status(201).json({ status: 400, message: "Something went wrong" })
               }
          }
     } catch (error) {
          if (error.message === "jwt expired") {
               return res.status(201).json({ status: 401, message: 'token has expired' })
          }
          res.send(error);
     }
}

// * update the user details
async function UpdateUser(req, res) {
     const _id = req.params.id;
     const payload = req.body;
     try {
          let user = await UserModel.findOne({ _id });
          Object.assign(user, payload);
          await user.save();
          return res.status(201).json({ status: 200, message: 'user has been updated', credentials: user })
     } catch (error) {
          console.log('error: ', error);
          return res.status(201).json({ status: 401, error: error.message })
     }
}

// * delete the user details
async function DeleteUser(req, res) {
     const _id = req.params.id;
     try {
          const user = await UserModel.findById(_id);
          await user.removeRecords();
          return res.status(201).json({ status: 200, message: 'user has been deleted' })
     } catch (error) {
          console.log('error: ', error);
          return res.status(201).json({ status: 401, error: error.message })
     }
}

// * UpdatePassword
async function UpdatePassword(req, res) {
     const _id = req.params.id;
     const { password } = req.body;
     try {
          let user = await UserModel.findById(_id);
          user.password = password;
          await user.save();
          return res.status(201).json({ status: 200, message: 'Password has been updated', credentials: user })
     } catch (error) {
          console.log('error: ', error);
          return res.status(201).json({ status: 401, error: error.message })
     }
}

async function FollowUser(req, res) {
     const payload = req.body;
     console.log('payload: ', payload);
     try {

          const userID = mongoose.Types.ObjectId(payload.userID)
          const followingID = mongoose.Types.ObjectId(payload.followingID)

          const follow = new FollowModel({ userID, followingID: followingID, followerID: followingID })
          console.log('follow: ', follow);
          await follow.save()

          const user = await UserModel.findById(userID);
          user.followingCount++;
          await user.save();

          const targetUser = await UserModel.findById(followingID);
          targetUser.followerCount++;
          await targetUser.save()

          return res.status(201).json({ status: 200, message: 'Followed the user.', credentials: user })
     } catch (error) {
          console.log('error: ', error);
          return res.status(201).json({ status: 401, error: error.message })
     }
}

async function UnFollowUser(req, res) {
     const payload = req.body;
     try {
          const userID = mongoose.Types.ObjectId(payload.userID)
          const followingID = mongoose.Types.ObjectId(payload.followingID)
          await FollowModel.findOneAndDelete({ userID, followingID: followingID, followerID: followingID })

          const user = await UserModel.findById(userID);
          user.followingCount--;
          await user.save();

          const targetUser = await UserModel.findById(followingID);
          targetUser.followerCount--;
          await targetUser.save()

          return res.status(201).json({ status: 200, message: 'Unfollowed the user.', credentials: user })
     } catch (error) {
          console.log('error: ', error);
          return res.status(201).json({ status: 401, error: error.message })
     }
}

async function UserFollower(req, res) {
     const id = req.params.id;
     try {
          const followers = await FollowModel.find({ followerID: id });
          return res.status(201).json({ status: 200, message: 'user follower.', followers })
     } catch (error) {
          console.log('error: ', error);
          return res.status(201).json({ status: 401, error: error.message })
     }
}

async function UserFollowing(req, res) {
     const id = req.params.id;
     try {
          const following = await FollowModel.find({ userID: id });
          return res.status(201).json({ status: 200, message: 'user following.', following })
     } catch (error) {
          console.log('error: ', error);
          return res.status(201).json({ status: 401, error: error.message })
     }
}

async function UserAllFollow(req, res) {
     const id = req.params.id;
     try {
          const following = await FollowModel.find({ userID: id }).populate('followingID');
          const followers = await FollowModel.find({ followingID: id }).populate('userID');
          return res.status(201).json({ status: 200, message: 'user following.', following, followers })
     } catch (error) {
          console.log('error: ', error);
          return res.status(201).json({ status: 401, error: error.message })
     }
}


module.exports = {
     UserDetail,
     UserQuery,
     UserLogin,
     UserLogout,
     GoogleAuth,
     UserRegisteration,
     sentVerificationEmail,
     verifyEmail,
     UpdateUser,
     DeleteUser,
     UpdatePassword,
     FollowUser,
     UnFollowUser,
     UserFollower,
     UserFollowing,
     UserAllFollow
}