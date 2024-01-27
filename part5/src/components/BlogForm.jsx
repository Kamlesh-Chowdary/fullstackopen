import { React, useState } from "react";
import blogService from "../services/blogs";
const AddBlog = ({ notifyWith, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const [createBlog, setCreateBlog] = useState(false);
  const addNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: likes,
    };
    try {
      const result = await blogService.create(newBlog);

      if (result && result.title) {
        notifyWith(`A new blog ${title} by ${author} is added.`);
        clearBlogForm();
        setBlogs((prevBlogs) => [...prevBlogs, result]);
        toggleCreate();
      }
    } catch (error) {
      notifyWith(error.response?.data.error || "An error occurred", "error");
    }
  };
  const toggleCreate = () => {
    setCreateBlog(!createBlog);
    clearBlogForm();
  };

  const clearBlogForm = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
    setLikes("");
  };
  if (!createBlog) {
    return <button onClick={toggleCreate}>new blog</button>;
  }
  return (
    <div>
      <h2>Create new blog</h2>
      <form>
        <div>
          title :
          <input
            type="text"
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author :
          <input
            type="text"
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url :
          <input
            type="text"
            value={url}
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes :
          <input
            type="text"
            value={likes}
            id="likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button onClick={addNewBlog}>create</button>
        <button onClick={toggleCreate}>cancel</button>
      </form>
    </div>
  );
};

export default AddBlog;
