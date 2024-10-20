const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/myblogs")
  .then(() => {
    console.log("Connect");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = mongoose;
