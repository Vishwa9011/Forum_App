const express = require("express");
require("dotenv").config();
const { connection } = require("./Configs/db");
const { PostRouter } = require("./Routes/post.routes");
const { UserRouter } = require("./Routes/user.router");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/user", UserRouter)

app.use("/post", PostRouter)

app.get("/", (req, res) => {
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