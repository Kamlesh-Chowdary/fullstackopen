const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject.password;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
