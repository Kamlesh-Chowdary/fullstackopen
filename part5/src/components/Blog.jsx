const Blog = ({ blog, handleView }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {"===>"} {blog.author}
      <button onClick={handleView}> view</button>
    </div>
  );
};
export default Blog;
