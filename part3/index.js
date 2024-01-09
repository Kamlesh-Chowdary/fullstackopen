require("dotenv").config();
const express = require("express");
const app = express();
const CORS = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");

app.use(CORS());
app.use(express.static("dist"));
app.use(express.json());
morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(":method :url  :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  Person.find({}).then((initialNumbers) => {
    res.json(initialNumbers);
  });
});

app.get("/info", (req, res) => {
  const date = Date();
  const data = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
  res.send(data);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  Person.findById(id)
    .then((number) => {
      res.send(number);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons/", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "The name or number is missing",
    });
  } else if (Person.find({ name: new RegExp(body.name, "i") })) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }
  const number = new Person({
    name: body.name,
    number: body.number,
  });

  number.save().then((newNumber) => {
    res.status(200).send(newNumber);
  });
  //  else if (
  //   persons.find((p) => p.name.toLowerCase() === newPerson.name.toLowerCase())
  // ) {
  //   return res.status(400).json({
  //     error: "name must be unique",
  //   });
});
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "Unknown End Point" });
};

app.use(unknownEndPoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
