const User = require("../models/User");

const whoami = async ({ userId }, res) => {
  const user = await User.findOne({ _id: userId }).exec();
  const username = user && user.username;
  res.json({ username });
};

module.exports = whoami;
