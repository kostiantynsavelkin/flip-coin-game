const HttpException = require("../utils/HttpException.utils");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const auth = () => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      const bearer = "Bearer ";
      if (!authHeader) {
        throw new HttpException(200, "Access denied. No credentials sent!");
      }

      const token = authHeader.replace(bearer, "");
      //Verify Token
      const decoded = jwt.verify(token, process.env.SECRET_JWT);
      const user_data = await UserModel.isEmptyUserByEmail(decoded.sub.email);
      if (!user_data.state) {
        throw new HttpException(200, "Authentication failed!");
      }
      // //if the user has permissions
      next();
    } catch (e) {
      e.status = 401;
      next(e);
    }
  };
};

module.exports = auth;
