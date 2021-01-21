const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_DB_URI; // contains the link to an online mongoDB instance

// Creates a new connection object to our database
const createConnection = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
createConnection();

const db = mongoose.connection;
module.exports = db; // exporting connection object for use in other modules
