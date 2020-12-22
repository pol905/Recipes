const mongoose = require("mongoose");

const uri =
  "mongodb+srv://root:M1a2s3t4e5r6@cluster0.a38iu.mongodb.net/Recipes?retryWrites=true&w=majority";

const createConnection = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
createConnection();

const db = mongoose.connection;
module.exports = db;
