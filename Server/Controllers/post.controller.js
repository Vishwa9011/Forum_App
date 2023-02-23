const { PostModel, CommentModel } = require("../Models/post.model");

async function PostRouterHome(req, res) {
     try {
          res.send("Home Post Page")
     } catch (error) {
          console.log('error: ', error);
          res.send(error);
     }
}


async function AllPost(req, res) {
     try {
          const posts = await PostModel.find()
               .populate([
                    { path: "author", model: "user" },
                    {
                         path: "comments", model: "Comment",
                         populate: {
                              path: "author",
                              model: "user"
                         }
                    }])
          res.status(200).json({ status: 200, posts, message: "all post has been sent." })
     } catch (error) {
          console.log('error: ', error);
          res.send(error);
     }
}

async function SinglePost(req, res) {
     const id = req.params.id;
     try {
          const post = await PostModel.findById(id);
          res.status(200).json({ status: 200, post, message: "post has been sent." })
     } catch (error) {
          console.log('error: ', error);
          res.send(error);
     }
}

async function SingleUserAllPost(req, res) {
     const id = req.params.id;
     try {
          const posts = await PostModel.find({ _id: id });
          res.status(200).json({ status: 200, posts, message: "all post of user has been sent." })
     } catch (error) {
          console.log('error: ', error);
          res.send(error);
     }
}

async function CreatePost(req, res) {
     const payload = req.body;
     try {
          const post = new PostModel(payload);
          await post.save();
          res.status(201).json({ status: 200, message: "Post has been created.", post });
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

async function UpdatePost(req, res) {
     const id = req.params.id;
     const payload = req.body
     try {
          let post = PostModel.findById(id);
          post = { ...post, ...payload, updatedAt: Date.now(), edited: true };
          await post.save()
          res.status(201).json({ status: 200, message: "Post has been updated.", post });
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

async function DeletePost(req, res) {
     const id = req.params.id;
     try {
          await PostModel.findByIdAndUpdate(id);
          res.status(201).json({ status: 200, message: "Post has been deleted." });
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}


async function SinglePostComment(req, res) {
     const id = req.params.id;
     console.log('id: ', id);
     try {
          const postComment = await CommentModel.find({ postID: id }).sort({ createdAt: -1 }).populate('author');
          res.status(200).json({ status: 200, message: "post comment has been sent.", postComment })
     } catch (error) {
          console.log('error: ', error);
          res.send(error);
     }
}

async function CreateComment(req, res) {
     const payload = req.body;
     try {
          const comment = new CommentModel(payload);
          await comment.save();

          let post = await PostModel.findById(payload.postID);
          const postComment = post.comments;
          postComment.push(comment._id);
          await post.save()

          res.status(201).json({ status: 200, message: "comment has been created.", comment })
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

async function CreateCommentReply(req, res) {
     const payload = req.body;
     try {
          var comment = new CommentModel(payload);
          await comment.save();

          var parentComment = await CommentModel.findById(payload.parentID);
          parentComment = { ...parentComment, child: [...parentComment.child, comment._id] }
          await parentComment.save()

          var post = await PostModel.findById(payload.postID);
          post = { ...post, comments: [...post.comments, comment._id] }
          await post.save()

          res.status(201).json({ status: 200, message: "comment has been created.", comment })
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}


async function UpdateComment(req, res) {
     const id = req.params.id;
     const { message } = req.body;
     try {
          let comment = CommentModel.findById(id);
          comment = { ...comment, message, edited: true };
          await comment.save()
          res.status(201).json({ status: 200, message: "Comment has been updated.", });
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

async function DeleteComment(req, res) {
     const id = req.params.id;
     try {
          await CommentModel.findByIdAndDelete(id);
          res.status(201).json({ status: 200, message: "Comment has been deleted." });
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}





module.exports = {
     PostRouterHome,
     AllPost,
     SinglePost,
     SingleUserAllPost,
     CreatePost,
     UpdatePost,
     DeletePost,
     CreateComment,
     CreateCommentReply,
     SinglePostComment,
     UpdateComment,
     DeleteComment
}