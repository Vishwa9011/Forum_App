const express = require("express");
const PostRouter = express.Router();
const post_controller = require("../Controllers/post.controller")

PostRouter.get("/", post_controller.PostRouterHome);

PostRouter.get("/all", post_controller.AllPost);

PostRouter.get("/:id", post_controller.AllPost);

PostRouter.get("/userPost/:id", post_controller.AllPost);

PostRouter.post("/new", post_controller.CreatePost);

PostRouter.patch("/update/:id", post_controller.UpdatePost);

PostRouter.delete("/delete/:id", post_controller.DeletePost);



module.exports = { PostRouter };