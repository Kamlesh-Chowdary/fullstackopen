require("dotenv").config();
const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

const validatePhoneNumber = (num) => {
  const phoneNumberRegX = /^\d{2,3}-\d{7,}$/;
  return phoneNumberRegX.test(num);
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: validatePhoneNumber,
      message: (props) =>
        `${props.value} is not a valid phone number! Please use XX(X)-XXXXXXX`,
    },
    minLength: 8,
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
