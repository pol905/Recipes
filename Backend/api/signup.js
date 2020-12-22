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
    res.json(saved_user);
  } catch (err) {
    console.error(err.message);
    res.send("Invalid user already exists!");
  }
};
module.exports = signup;
