const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlog[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlog[1]);
  await blogObject.save();
});
test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined();
  });
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "rajj singh",
    author: "ranmansingh",
    url: " alampachaad",
    likes: 50,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlog.length + 1);
});

test("new blog without likes property will be set to 0", async () => {
  const newBlog = {
    title: "Tajj darling",
    author: "fidensai kakoji",
    url: "jolly rancher",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const blogLikes = response.body.map((blog) => blog.likes);
  expect(blogLikes).toContain(0);
});

test("creating a new blog without title returns 400 Bad Request", async () => {
  const newBlog = {
    author: "fidensai kakoji",
    url: "www.lottiloring.com",
    likes: 40,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
});
test("creating a new blog without url returns 400 Bad Request", async () => {
  const newBlog = {
    title: "pingali",
    author: "fidensai kakoji",
    likes: 40,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("deleting a blog returns 204 No Content", async () => {
  const blogsBeforeDelete = await Blog.find({});
  const blogToDelete = blogsBeforeDelete[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAfterDelete = await api.get("/api/blogs");
  expect(blogsAfterDelete.body).toHaveLength(initialBlog.length - 1);
});

test("the information of a single blog post is updated", async () => {
  const blogAtStart = await Blog.find({});
  const blogToUpdate = blogAtStart[0];
  const newBlog = { ...blogToUpdate, likes: 40 };
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const blogAtEnd = await Blog.find({});

  const beforeLikes = blogAtStart.map((blog) => blog.likes);
  const afterLikes = blogAtEnd.map((blog) => blog.likes);

  expect(afterLikes).not.toContain(beforeLikes);
});

afterAll(async () => {
  await mongoose.connection.close();
});
