import { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, user, setRefreshBlog, refreshBlog }) => {
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
    await blogService.update(updateLike);
    setRefreshBlog(!refreshBlog);
  };
  const handleView = () => {
    setDisplayFullBlog(!displayFullBlog);
  };

  const handleDelete = async () => {
    if (blog.user[0].username === user.username) {
      const ok = window.confirm(`Remove blog  ${blog.title} by ${blog.author}`);
      if (ok) {
        await blogService.remove(blog.id);
        setRefreshBlog(!refreshBlog);
      }
    }
  };

  return (
    <div className="blog">
      <div style={blogStyle} className="whenHidden">
        {blog.title} {"===>"} {blog.author}
        <button onClick={handleView}>
          {" "}
          {displayFullBlog ? "hide" : "view"}
        </button>
        {displayFullBlog && (
          <div className="whenShown">
            {blog.url}
            <br />
            likes {blog.likes}
            <button onClick={increaseLike} id="like">
              like
            </button>
            <br />
            {blog.user[0].name}
            <br />
            {blog.user[0].name == user.name && (
              <button onClick={handleDelete} id="delete-button">
                delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Blog;
