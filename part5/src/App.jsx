import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
// import AddBlog from "./components/AddBlog";

const AddBlog = ({
  addNewBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  likes,
  setLikes,
  toggleCreate,
}) => {
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
// export default AddBLog
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");
  const [notification, setNotification] = useState({ message: null });
  const [createBlog, setCreateBlog] = useState(false);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("LoggedUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notifyWith = (message, type = "info") => {
    setTimeout(() => {
      setNotification({ message, type });
    }, 0);
    setTimeout(() => {
      setNotification({ message: null });
    }, 3000);
  };
  const clearBlogForm = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
    setLikes("");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("LoggedUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);

      setPassword("");
      setUsername("");
    } catch (error) {
      notifyWith(error.response.data.error, "error");
    }
  };

  if (user === null) {
    return (
      <>
        <h2>Login in to application</h2>
        <Notification message={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type="text"
              value={username}
              id="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              value={password}
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  }
  const handleLogout = () => {
    window.localStorage.removeItem("LoggedUser");
    setUser(null);
  };

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

  const createBlogForm = () => {
    if (!createBlog) {
      return <button onClick={toggleCreate}>new blog</button>;
    }
    return (
      <AddBlog
        addNewBlog={addNewBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        likes={likes}
        setLikes={setLikes}
        toggleCreate={toggleCreate}
      />
    );
  };
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <p>
        {user.name} Logged in{" "}
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
      </p>
      {createBlogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
