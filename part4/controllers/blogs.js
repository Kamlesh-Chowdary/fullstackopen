const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogPost = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogPost);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

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
  const blog = await Blog.findById(req.params.id).populate("users");
  if (blog) res.send(blog);
  else res.status(404).end();
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
