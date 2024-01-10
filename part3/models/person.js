require("dotenv").config();
const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(URI)
  .then((res) => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);