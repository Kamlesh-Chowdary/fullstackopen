const mongoose = require("mongoose");

const [, password, name, number] = process.argv;

const URI = `mongodb+srv://kamlesh:${password}@cluster0.ovhquw0.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(URI);
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const People = mongoose.model("Person", personSchema);

const Person = new People({ name, number });

Person.save().then((result) => {
  mongoose.connection().close();
});
