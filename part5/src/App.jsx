import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [refreshBlog, setRefreshBlog] = useState(false);

  const [notification, setNotification] = useState({ message: null });

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, [refreshBlog]);

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
          <button type="submit" id="login-button">
            login
          </button>
        </form>
      </>
    );
  }
  const handleLogout = () => {
    window.localStorage.removeItem("LoggedUser");
    setUser(null);
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
      <BlogForm
        notifyWith={notifyWith}
        setBlogs={setBlogs}
        setRefreshBlog={setRefreshBlog}
        refreshBlog={refreshBlog}
      />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          setRefreshBlog={setRefreshBlog}
          refreshBlog={refreshBlog}
        />
      ))}
    </div>
  );
};

export default App;
