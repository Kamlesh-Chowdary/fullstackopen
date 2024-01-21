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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlog,
  blogsInDb,
};
