const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connection } = require("./Configs/db");
const { PostRouter } = require("./Routes/post.routes");
const { UserRouter } = require("./Routes/user.router");

const app = express();

// app.use(cookieParser())


app.use(cors())

app.use(express.json());

app.use("/user", UserRouter)

app.use("/post", PostRouter)

app.get("/", (req, res) => {
     // const cookie = req.cookies.User
     // if (cookie == null) {
     //      res.cookie('User', "63f631014d5749dd2bf27257", { httpOnly: true });
     // } else {
     //      console.log('cookie: ', cookie);
     // }
     res.send("Home Page")
})

const port = process.env.PORT || 8080
app.listen(port, async () => {
     try {
          await connection;
          console.log("server is running.");
     } catch (error) {
          console.log('error: ', error);
     }
})