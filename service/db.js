/**
 * MongoDB connection helper.
 */
const mongoose = require("mongoose");

module.exports = async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  return mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
};
