const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlog);
});
describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(resultBlog.body.id).toBeDefined();
  });
});
describe("viewing a specific blog", () => {
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
    expect(response.body).toHaveLength(helper.initialBlog.length + 1);
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

    const blogsAtEnd = await helper.blogsInDb();

    const blogLikes = blogsAtEnd.map((blog) => blog.likes);
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
});
describe("deletion of a note", () => {
  test("deleting a blog returns 204 No Content", async () => {
    const blogsBeforeDelete = await helper.blogsInDb();
    const blogToDelete = blogsBeforeDelete[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfterDelete = await helper.blogsInDb();
    expect(blogsAfterDelete).toHaveLength(helper.initialBlog.length - 1);
  });
});
describe("update of a note", () => {
  test("C", async () => {
    const blogAtStart = await helper.blogsInDb();
    const blogToUpdate = blogAtStart[0];
    const newBlog = { ...blogToUpdate, likes: 40 };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const blogAtEnd = await helper.blogsInDb();

    const beforeLikes = blogAtStart.map((blog) => blog.likes);
    const afterLikes = blogAtEnd.map((blog) => blog.likes);

    expect(afterLikes).not.toContain(beforeLikes);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
