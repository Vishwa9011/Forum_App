const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connection } = require("./Configs/db");
const { PostRouter } = require("./Routes/post.routes");
const { UserRouter } = require("./Routes/user.router");

const app = express();

app.use(cors())

app.use(express.json());

app.use("/user", UserRouter)

app.use("/post", PostRouter)

app.get("/", (req, res) => {
     res.send("Home Page")
})

app.get("*", (req, res) => {
     res.status(404).json("not found")
})

app.use(function (err, req, res, next) {
     res.send("Error")
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