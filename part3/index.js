const express = require("express");
const app = express();
const PORT = 3001;

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

app.use((req, res, next) => {
  req.requestTime = new Date();
  req.phonebookCount = entries.length;
  next();
});

app.get("/api/persons", (req, res) => {
  res.json(entries);
});

app.get("/info", (req, res) => {
  const responseText = `<p>Phonebook has info for ${req.phonebookCount} people,<br>${req.requestTime} `;
  res.send(responseText);
});

app.get("/api/persons/:id", (req, res) => {
  const userId = Number(req.params.id);
  const responseText = entries.find((note) => note.id === userId);

  if (responseText) {
    res.json(responseText);
  } else {
    res.status(404).end();
  }
});

app.listen(PORT);
