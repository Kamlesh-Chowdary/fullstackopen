const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

// test("Unique identifier property should be named id instead of _id", async () => {
//   const response  = await api.get("/api/blogs");
//   const blogPosts = response.data;
//   blogPosts.forEach((blogPost) => {
//     expect(blogPost.id).toBeDefined();
//   });
// });

afterAll(async () => {
  await mongoose.connection.close();
});
