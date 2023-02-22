const express = require("express");
const UserRouter = express.Router();
const user_controller = require("../Controllers/user.controller")

UserRouter.get("/", user_controller.UserRouteHome);

UserRouter.post("/register", user_controller.UserRegisteration);

UserRouter.post("/login", user_controller.UserLogin);

UserRouter.post("/googleauth", user_controller.GoogleAuth);

UserRouter.post("/logout", user_controller.UserLogout);

UserRouter.post("/sentverificationemail", user_controller.sentVerificationEmail);

UserRouter.post("/verifyemail", user_controller.verifyEmail)

UserRouter.post("/update/:id",)

UserRouter.post("/delete/:id",)

module.exports = { UserRouter };