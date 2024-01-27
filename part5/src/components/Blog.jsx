import { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, user, setBlogs, blogs }) => {
  const [displayFullBlog, setDisplayFullBlog] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const increaseLike = async () => {
    const updateLike = {
      ...blog,
      likes: blog.likes + 1,
    };
    const updatedBlog = await blogService.update(updateLike);
    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
    );
  };
  const handleView = () => {
    setDisplayFullBlog(!displayFullBlog);
  };
  return (
    <div style={blogStyle}>
      {blog.title} {"===>"} {blog.author}
      <button onClick={handleView}> {displayFullBlog ? "hide" : "view"}</button>
      {displayFullBlog && (
        <div>
          {blog.url}
          <br />
          likes {blog.likes}
          <button onClick={increaseLike}>like</button>
          <br />
          {user.username}
        </div>
      )}
    </div>
  );
};
export default Blog;
