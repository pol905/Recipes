const User = require("../models/User");

const whoami = async ({ userId }, res) => {
  const user = await User.findOne({ _id: userId }).exec();
  const username = user && user.username;
  res.send(`Hello ${username}`);
};

module.exports = whoami;
