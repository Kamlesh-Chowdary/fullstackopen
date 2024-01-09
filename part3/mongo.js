const mongoose = require("mongoose");
const password = process.argv[2];
const URI = `mongodb+srv://kamlesh:${password}@cluster0.ovhquw0.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(URI);
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const People = mongoose.model("Person", personSchema);
const { name, number } = { name: process.argv[3], number: process.argv[4] };
const Person = new People({
  name,
  number,
});

Person.save().then((result) => {
  mongoose.connection().close();
});
