import { useState } from "react";

const Blog = ({ blog }) => {
  const [displayFullBlog, setDisplayFullBlog] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
          <button>like</button>
          <br />
          {blog.user[0].username}
        </div>
      )}
    </div>
  );
};
export default Blog;
