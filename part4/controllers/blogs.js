const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
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
    newBlog.save().then((result) => {
      response.status(201).json(result);
    });
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
module.exports = blogsRouter;
