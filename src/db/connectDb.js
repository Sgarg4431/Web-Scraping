const mongoose = require("mongoose");
const config = require("../config/config");

// connecting to mongo Db
const connectDb = async () => {
  mongoose
    .connect(config.URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((e) => {
      console.log("not connected" + e);
    });
};

module.exports = connectDb;
