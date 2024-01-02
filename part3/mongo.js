const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://kamlesh:${password}@cluster0.ovhquw0.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url);
mongoose.set("strictQuery", false);
const entrySchema = mongoose.Schema({
  name: String,
  number: Number,
});

const Entry = mongoose.model("entry", entrySchema);
const entry = Entry({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length < 4) {
  Entry.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((element) => {
      console.log(`${element.name} ${element.number}`);
    });
    mongoose.connection.close();
  });
} else {
  entry.save().then((res) => {
    console.log(`added ${entry.name} number ${entry.number} to phonebook`);
    mongoose.connection.close();
  });
}
