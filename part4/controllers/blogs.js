const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
blogsRouter.get("/", async (request, response) => {
  const blogPost = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogPost);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  if (newBlog.title === undefined || newBlog.url === undefined) {
    response.status(400).end();
  } else {
    const savedBlog = await newBlog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  }
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user");
  if (blog) res.send(blog);
  else res.status(404).end();
});

blogsRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  if (blog.user.toString() === user.id) {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } else {
    return res.status(401).json({ error: "Unauthorized to delete the Blog" });
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const returnedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, {
    new: true,
  });
  res.json(returnedBlog);
});
module.exports = blogsRouter;
