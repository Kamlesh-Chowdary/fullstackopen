const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

app.use(
  morgan(":method :body :status :res[content-length] - :response-time ms")
);
app.use(morgan("tiny"));

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
  res.json(persons);
});

app.get("/info", (req, res) => {
  const date = Date();
  const data = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
  res.send(data);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.send(person);
  } else {
    res.status(404).send("This url can't be reached");
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons/", (req, res) => {
  const newPerson = req.body;
  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({
      error: "The name or number is missing",
    });
  } else if (
    persons.find((p) => p.name.toLowerCase() === newPerson.name.toLowerCase())
  ) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  newPerson.id = maxId + 1;
  persons = persons.concat(newPerson);
  res.status(202).send(newPerson);
});
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "Unknown End Point" });
};

app.use(unknownEndPoint);
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
