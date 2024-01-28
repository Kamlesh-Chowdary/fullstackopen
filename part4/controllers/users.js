const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res) => {
  const userDetails = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  res.json(userDetails);
});
usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (password === undefined || username === undefined) {
    return res
      .status(400)
      .json({ error: "password and username must be given" });
  } else if (password.length < 3 || username.length < 3) {
    return res.status(400).json({
      error: "password or username must be at least 3 characters long",
    });
  } else {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "expected `username` to be unique" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username: username,
      name: name,
      passwordHash: hashedPassword,
    });
    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  }
});

module.exports = usersRouter;
