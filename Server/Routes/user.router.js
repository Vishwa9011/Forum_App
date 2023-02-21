const express = require("express");
const UserRouter = express.Router();
import * as user_controller from '../Controllers/user.controller';

UserRouter.get("/", user_controller.UserRouteHome)

UserRouter.get("/register", user_controller.UserRegisteration)

module.exports = { UserRouter };