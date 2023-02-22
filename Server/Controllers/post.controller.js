const { PostModel } = require("../Models/post.model");

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
          const posts = await PostModel.find();
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
     const payload = req.body
     try {
          let post = PostModel.findById(id);
          post = { ...post, ...payload };
          await post.save()
          res.status(201).json({ status: 200, message: "Post has been updated.", post });
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
     DeletePost
}