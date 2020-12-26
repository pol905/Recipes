const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_DB_URI;

const createConnection = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
createConnection();

const db = mongoose.connection;
module.exports = db;
