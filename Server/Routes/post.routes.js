const express = require("express");
const PostRouter = express.Router();
const post_controller = require("../Controllers/post.controller")

PostRouter.get("/", post_controller.PostRouterHome);

PostRouter.get("/all", post_controller.AllPost);

PostRouter.get("/all/:id", post_controller.SingleUserAllPost);

PostRouter.get("/:id", post_controller.SinglePost);

PostRouter.get("/userPost/:id", post_controller.AllPost);

PostRouter.post("/new", post_controller.CreatePost);

PostRouter.patch("/update/:id", post_controller.UpdatePost);

PostRouter.delete("/delete/:id", post_controller.DeletePost);

PostRouter.post("/:id/like", post_controller.LikePost);

PostRouter.post("/:id/unlike", post_controller.UnLikePost);

PostRouter.get("/:id/postlikes", post_controller.GetPostLikes);


// ? Comments


PostRouter.get("/:id/comments", post_controller.SinglePostComment);

PostRouter.patch("/comment/update/:id", post_controller.UpdateComment);

PostRouter.delete("/comment/delete/:id", post_controller.DeleteComment);

PostRouter.post("/comment/new", post_controller.CreateComment);

PostRouter.post("/comment/newreply", post_controller.CreateCommentReply);


module.exports = { PostRouter };