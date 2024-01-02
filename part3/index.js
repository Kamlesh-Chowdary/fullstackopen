const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person.js");

require("dotenv").config;

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(morgan("tiny"));
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

let entries = [
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

app.use(async (req, res, next) => {
  req.requestTime = new Date();
  req.phonebookCount = await Person.find({}).then((result) => {
    return result.length;
  });
  next();
});

app.use(express.json());

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.send(result);
  });
});

app.get("/info", (req, res) => {
  const singleEntry = `<p>Phonebook has info for ${req.phonebookCount} people,<br>${req.requestTime} `;
  res.send(singleEntry);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const singleEntry = Person.findById(id).then((res) => res);
  if (singleEntry) {
    res.json(singleEntry);
  } else {
    res.status(404).end();
  }
});

// app.put("/api/persons/:id", (req, res)=>{
//   const id = Number(req.params.id);
//   const updatedEntries =
// })

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  // const updatedEntries = entries.filter((entry) => entry.id !== id);

  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      return error;
    });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const duplicateEntry = entries.find((entry) => entry.name === body.name);

  if (body.name === undefined) {
    return res.status(400).json({ error: "name or number missing" });
  }
  if (duplicateEntry) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const entry = new Person({
    name: body.name,
    number: body.number,
  });

  entry.save().then((result) => res.send(result));
});
app.use(unknownEndpoint);
app.listen(PORT);
