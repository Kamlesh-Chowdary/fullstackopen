const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogPost = await Blog.find({});
  response.json(blogPost);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  if (newBlog.title === undefined || newBlog.url === undefined) {
    response.status(400).end();
  } else {
    const result = await newBlog.save();
    response.status(201).json(result);
  }
});
blogsRouter.delete("/:id", async (req, res) => {
  const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
  if (deleteBlog) {
    res.status(204).end();
  } else {
    res.status(400).end();
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
