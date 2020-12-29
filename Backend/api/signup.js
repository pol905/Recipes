const User = require("../models/User");
const argon = require("argon2");

const signup = async ({ username, password, email }, res) => {
  const user = new User({
    username: username,
    email: email,
    password: await argon.hash(password),
  });
  let saved_user;
  try {
    saved_user = await user.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(409);
  }
};
module.exports = signup;
