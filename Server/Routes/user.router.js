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

UserRouter.patch("/update/:id", user_controller.UpdateUser)

UserRouter.post("/delete/:id", user_controller.DeleteUser)

UserRouter.patch("/newpassword/:id", user_controller.UpdatePassword)

module.exports = { UserRouter };