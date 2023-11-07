const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(
  cors({ origin: "https://phonebookbackend-ryi5.onrender.com/api/persons" })
);
app.use(morgan("tiny"));

const generateRandomId = () => {
  return Math.floor(Math.random() * 5123);
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

app.use((req, res, next) => {
  req.requestTime = new Date();
  req.phonebookCount = entries.length;
  next();
});

app.use(express.json());
app.get("/", (req, res) => {
  res.json(entries);
});
app.get("/api/persons", (req, res) => {
  res.json(entries);
});

app.get("/info", (req, res) => {
  const singleEntry = `<p>Phonebook has info for ${req.phonebookCount} people,<br>${req.requestTime} `;
  res.send(singleEntry);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const singleEntry = entries.find((entry) => entry.id === id);
  if (singleEntry) {
    res.json(singleEntry);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedEntries = entries.filter((entry) => entry.id !== id);

  if (updatedEntries.length < entries.length) {
    // Deletion was successful
    entries = updatedEntries;
    res.json(entries);
  } else {
    // Deletion failed, return an error response
    res.status(400).json({ error: "Entry not found" });
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body);
  const duplicateEntry = entries.find((entry) => entry.name === body.name);

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number missing" });
  }
  if (duplicateEntry) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const entry = {
    id: generateRandomId(),
    name: body.name,
    number: body.number,
  };

  entries = entries.concat(entry);
  res.json(entry);
});

app.listen(PORT);
