const { UserModel } = require("../Models/user.model");

const UserRouteHome = async (req, res) => {
     try {
          res.send("User Home Page")
     } catch (error) {
          console.log('error: ', error);
     }
}

async function UserRegisteration(req, res) {
     const { password, ...payload } = req.body;
     try {
          const CheckUser = await UserModel.findOne({ email: payload.email })

          if (CheckUser) return

          res.send("User Home Page")
     } catch (error) {
          console.log('error: ', error);
     }
}

module.exports = {
     UserRouteHome,
     UserRegisteration
}