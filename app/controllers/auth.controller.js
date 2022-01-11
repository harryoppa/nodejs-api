const bcrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config")

const User = db.user;

exports.login = async (ctx) => {
  try {
    const user = await User.findOne({
      where: {
        email: ctx.request.body.email,
      },
    });
  
    if (!user) {
      ctx.status = 404;
      ctx.body = {
        message: "User Not found.",
      };
      return;
    }
  
    let passwordIsValid = bcrypt.compareSync(ctx.request.body.password, user.password);
  
    if (!passwordIsValid) {

      ctx.status = 401;
      ctx.body = {
        accessToken: null,
        message: "Invalid Password!",
      };
      return;
    }
  
    let token = jwt.sign({ id: user.id }, config.auth.secret, {
      expiresIn: 86400, // 24 hours
    });
  
    ctx.status = 200;
    ctx.body = {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    };
  } catch(err) {
    // res.status(500).send({ message: err.message });
    ctx.status = 500;
    ctx.body = {
      message: err.message,
    };
  }
};
