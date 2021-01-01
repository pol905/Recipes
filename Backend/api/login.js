const argon = require("argon2");
const User = require("../models/User");

const login = async (req, res) => {
  const { username, password } = req.body.user;
  try {
    const user = await User.findOne({ username }).exec();
    if (user) {
      if (await argon.verify(user.password, password)) {
        req.session.userId = user._id;
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = login;
