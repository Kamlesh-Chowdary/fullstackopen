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

app.get("/api/persons", (req, res) => {
  Person.find({}).then((initialNumbers) => {
    res.json(initialNumbers);
  });
});

app.get("/info", async (req, res) => {
  try {
    const date = Date();
    const count = await Person.countDocuments();
    const data = `<p>Phonebook has info for ${count} people</p><p>${date}</p>`;
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((number) => {
      res.send(number);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;
  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error));
});

app.post("/api/persons/", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "The name or number is missing",
    });
  }
  // else if (!Person.find({ name: new RegExp(body.name, "i") })) {
  //   return res.status(400).json({
  //     error: "Name must be unique",
  //   });
  // }
  const number = new Person({
    name: body.name,
    number: body.number,
  });

  number
    .save()
    .then((newNumber) => {
      res.status(200).send(newNumber);
    })
    .catch((error) => next(error));
});
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "Unknown End Point" });
};

app.use(unknownEndPoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
