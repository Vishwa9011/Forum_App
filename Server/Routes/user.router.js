const express = require("express");
const UserRouter = express.Router();
const user_controller = require("../Controllers/user.controller")

UserRouter.get("/:id", user_controller.UserDetail);

UserRouter.get("/", user_controller.UserQuery);

UserRouter.post("/register", user_controller.UserRegisteration);

UserRouter.post("/login", user_controller.UserLogin);

UserRouter.post("/googleauth", user_controller.GoogleAuth);

UserRouter.post("/logout", user_controller.UserLogout);

UserRouter.post("/sentverificationemail", user_controller.sentVerificationEmail);

UserRouter.post("/verifyemail", user_controller.verifyEmail)

UserRouter.post("/update/:id", user_controller.UpdateUser)

UserRouter.delete("/delete/:id", user_controller.DeleteUser)

UserRouter.post("/follow", user_controller.FollowUser)

UserRouter.post("/unfollow", user_controller.UnFollowUser)

UserRouter.get("/:id/follower", user_controller.UserFollower)

UserRouter.get("/:id/follow/all", user_controller.UserAllFollow)

UserRouter.get("/:id/following", user_controller.UserFollowing)

UserRouter.patch("/newpassword/:id", user_controller.UpdatePassword)

module.exports = { UserRouter };