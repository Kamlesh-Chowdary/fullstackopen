const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);
require("dotenv").config();

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
