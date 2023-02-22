require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Email_template } = require("../helper/EmaiL.template");
const { UserModel } = require("../Models/user.model");

const UserRouteHome = async (req, res) => {
     const { _id } = req.query;
     console.log('_id: ', _id);
     try {
          const user = await UserModel.findById(_id)
          console.log('user: ', user);
          res.send(user)
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

async function UserRegisteration(req, res) {
     const { password, ...payload } = req.body;
     try {
          const CheckUser = await UserModel.findOne({ email: payload.email })

          if (CheckUser) return res.status(400).json({ message: "User already exist" })

          const hash = await bcrypt.hash(password, 5);

          const user = new UserModel({ ...payload, password: hash });

          await user.save();

          res.status(201).json({ status: 200, message: "registeration success" })
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

async function GoogleAuth(req, res) {
     const payload = req.body;
     try {
          const CheckUser = await UserModel.findOne({ email: payload.email })
          if (CheckUser) return res.status(400).json({ message: "User already exist" })

          const user = new UserModel({ ...payload, isGoogleAuthenticated: true, online: true, isVerified: true });

          const token = await jwt.sign({ email: payload.email }, process.env.SECRET_KEY);

          user.token = token;

          await user.save();

          res.status(201).json({ status: 200, message: "GoogleAuth success", token })
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

async function UserLogin(req, res) {
     const { password, email } = req.body;
     try {
          const user = await UserModel.findOne({ email })
          if (user) {
               const isMatched = await bcrypt.compare(password, user.password);
               if (isMatched) {
                    const token = await UserModel.getAuthorizationToken();
                    res.status(201).json({ status: 200, message: "Login Success", token })
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
               html: Email_template("http://localhost:8080/verify", EncryptedCredential)
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
     try {
          const decode = jwt.verify(credential, process.env.VERIFICATION_SECRET_KEY)
          if (decode) {
               const user = await UserModel.findOne({ email: decode.email });
               if (user) {
                    if (user.email === decode.email && user.password === decode.password) {
                         user.isVerified = true;
                         const token = await UserModel.getAuthorizationToken();
                         return res.status(201).json({ status: 200, message: 'Email has been verified', token })
                    } else {
                         return res.status(201).json({ status: 403, message: 'Wrong credential' })
                    }
               } else {
                    return res.status(201).json({ status: 400, message: "Something went wrong" })
               }
          }
     } catch (error) {
          console.log('error: ', error);
          if (error.message === "jwt expired") {
               res.status(201).json({ status: 401, message: 'token has expired' })
          }
          res.send(error)
     }
}

// * update the user details
async function UpdateUser() {

}


module.exports = {
     UserRouteHome,
     UserLogin,
     UserLogout,
     GoogleAuth,
     UserRegisteration,
     sentVerificationEmail,
     verifyEmail
}