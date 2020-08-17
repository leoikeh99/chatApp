const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

var conn;

const connectDB = async (req, res) => {
  try {
    conn = await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("mongodb connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, conn };
