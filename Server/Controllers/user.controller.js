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

          res.send("User Home Page")
     } catch (error) {
          console.log('error: ', error);
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
     }
}

async function sentVerificationEmail(req, res) {
     const { email, password } = req.body;
     // const email = "warningzone2021@gmail.com";
     // const password = 'karan';
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
     }
}

// * verify email after clicking on email button;
async function verifyEmail(req, res) {
     const { credential } = req.body;
     try {
          const user = await UserModel.findOne({ email });
          if (user) {
               jwt.verify(credential, process.env.VERIFICATION_SECRET_KEY, (err, decode) => {
                    if (decode) {
                         if (user.email === decode.email && user.password === decode.password) {
                              res.status(201).json({ status: 200, message: 'Email has been verified' })
                         } else {
                              res.status(201).json({ status: 403, message: 'Wrong credential' })
                         }
                    }

                    if (err) {
                         if (err.message === "jwt expired") {
                              res.status(201).json({ status: 401, message: 'token has expired' })
                         }
                         console.log('err: ', err);
                    }
               })
          }
     } catch (error) {
          console.log('error: ', error);
     }
}


module.exports = {
     UserRouteHome,
     UserLogin,
     UserRegisteration,
     sentVerificationEmail,
     verifyEmail
}