// getting-started.js
const mongoose = require("mongoose");

module.exports = async function connectDatabase() {
  await mongoose.connect("mongodb://127.0.0.1/aroundb", {
    useNewUrlParser: true,
  });
  console.log("Database connected!");
};
