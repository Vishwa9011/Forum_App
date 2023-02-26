require("dotenv").config()
const { PostModel, CommentModel, LikesModel } = require("../Models/post.model");

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
                         path: "comments", model: "Comment", populate: {
                              path: "author",
                              model: "user"
                         }
                    }]).sort({ createdAt: -1 })
          res.status(200).json({ status: 200, posts, message: "all post has been sent." })
     } catch (error) {
          console.log('error: ', error);
          res.send(error);
     }
}

async function SinglePost(req, res) {
     const id = req.params.id;
     try {
          const post = await PostModel.findById(id).populate([
               { path: "author", model: "user" },
               {
                    path: "comments", model: "Comment", populate: {
                         path: "author", model: "user"
                    }
               }
          ])
          res.status(200).json({ status: 200, post, message: "post has been sent." });
     } catch (error) {
          console.log('error: ', error);
          res.send(error);
     }
}

async function SingleUserAllPost(req, res) {
     const id = req.params.id;
     try {
          const posts = await PostModel.find({ author: id })
               .populate([
                    { path: "author", model: "user" },
                    {
                         path: "comments", model: "Comment",
                         populate: {
                              path: "author",
                              model: "user"
                         }
                    }]).sort({ createdAt: -1 })
          res.status(200).json({ status: 200, posts, message: "all post has been sent." })
     } catch (error) {
          console.log('error: ', error);
          res.send(error);
     }
}

async function CreatePost(req, res) {
     const payload = req.body;
     console.log('payload: ', payload);
     try {
          const post = new PostModel(payload);
          await post.save()
          res.status(201).json({ status: 200, message: "Post has been created." });
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

async function UpdatePost(req, res) {
     const id = req.params.id;
     const payload = req.body
     try {
          let post = await PostModel.findOne({ _id: id });
          const data = { ...payload, updatedAt: Date.now(), edited: true }
          Object.assign(post, data)
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
          const post = await PostModel.findById(id);
          await post.removeRecords();
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
          var comment = await CommentModel.findById(id);
          comment.message = message;
          comment.edited = true
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
          const comment = await CommentModel.findById(id);
          await comment.removeRecords();
          res.status(201).json({ status: 200, message: "Comment has been deleted." });
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

async function LikePost(req, res) {
     const id = req.params.id;
     const { userId } = req.body
     console.log('userId: ', userId);
     try {

          const check = await LikesModel.findOne({ postID: id, authorID: userId, author: userId });
          if (check) {
               return res.status(403).json({ status: 403, msg: "already liked the post" })
          }

          const like = new LikesModel({ postID: id, authorID: userId, author: userId });
          await like.save()

          const likes = await LikesModel.find({ authorID: userId });

          const post = await PostModel.findById(id)
          post.likes++;
          await post.save()

          res.status(201).json({ status: 200, message: "Like has been updated in the post.", likes });
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

async function UnLikePost(req, res) {
     const id = req.params.id;
     const { userId } = req.body
     try {

          await LikesModel.findOneAndDelete({ postID: id, authorID: userId, author: userId });

          const likes = await LikesModel.find({ authorID: userId });


          const post = await PostModel.findById(id)
          post.likes--;
          await post.save()

          res.status(201).json({ status: 200, message: "Like has been deleted.", likes });
     } catch (error) {
          console.log('error: ', error);
          res.send(error)
     }
}

async function GetPostLikes(req, res) {
     const id = req.params.id;
     try {
          const likes = await LikesModel.find({ authorID: id });
          return res.status(201).json({ status: 200, message: 'Likes list of user .', likes })
     } catch (error) {
          console.log('error: ', error);
          return res.status(201).json({ status: 401, error: error.message })
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
     DeleteComment,
     LikePost,
     UnLikePost,
     GetPostLikes
}