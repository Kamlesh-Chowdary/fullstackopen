import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

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
      console.log("Unauthorized user : Invalid username or passwrod");
    }
  };

  if (user === null) {
    return (
      <>
        <h2>Login in to application</h2>
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
    const result = await blogService.create(newBlog);
    if (result) {
      setTitle("");
      setAuthor("");
      setUrl("");
      setLikes("");
      setBlogs(blogs.concat(result));
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} Logged in</p>
      <button type="submit" onClick={handleLogout}>
        logout
      </button>

      <div>
        <h2>Create new blog</h2>
        <form onSubmit={addNewBlog}>
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
          <button type="submit">create</button>
        </form>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
