const mongoose = require("mongoose");

const url = "mongodb://localhost:27017";

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
