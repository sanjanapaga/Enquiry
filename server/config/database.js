const mongoose = require("mongoose")

const configureDb = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/task")
    .then(() => {
      console.log("don't worry your db successfully connected")
    })
    .catch(() => {
      console.log("something went wrong in your db")
    });
};

module.exports = configureDb
