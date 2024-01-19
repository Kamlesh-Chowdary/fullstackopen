const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlog = [
  {
    title: "piliponchi kamaram yiiu",
    author: "tasmaika yona String",
    url: "Asmaika loka String",
    likes: 15,
  },
  {
    title: "yiiu rajj singh",
    author: "String ranmansingh",
    url: "String alampachaad",
    likes: 50,
  },
];
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

afterAll(async () => {
  await mongoose.connection.close();
});
