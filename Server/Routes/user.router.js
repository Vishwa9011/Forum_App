const express = require("express");
const UserRouter = express.Router();
const user_controller = require("../Controllers/user.controller")
const { UserModel } = require('../Models/user.model');

UserRouter.get("/", user_controller.UserRouteHome);

UserRouter.post("/register", user_controller.UserRegisteration);

UserRouter.post("/login", user_controller.UserLogin);

UserRouter.post("/sentverificationemail", user_controller.sentVerificationEmail);

UserRouter.post("/verifyemail", user_controller.verifyEmail)

module.exports = { UserRouter };