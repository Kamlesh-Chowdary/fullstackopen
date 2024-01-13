const mongoose = require("mongoose");

const [, , password, name, number] = process.argv;

const URI = `mongodb+srv://kamlesh:${password}@cluster0.ovhquw0.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(URI);
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const People = mongoose.model("Person", personSchema);

const Person = new People({ name, number });

if (process.argv.length < 4) {
  console.log("phonebook:");
  People.find({}).then((res) => {
    res.forEach((p) => {
      console.log(p.name, p.number);
    });
    mongoose.connection.close();
  });
} else {
  Person.save().then(() => {
    console.log(`Added ${name}'s number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
