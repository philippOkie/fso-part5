import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newAuthor, setAuthor] = useState("");
  const [newTitle, setTitle] = useState("");
  const [newUrl, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [appliedStyle, setAppliedStyle] = useState({});
  const [blogVisible, setBlogVisible] = useState(false);

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const green = {
    color: "green",
    border: "green 2px solid",
  };

  const red = {
    color: "red",
    border: "red 2px solid",
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage(`wrong username or password`);
      setAppliedStyle(red);
      setTimeout(() => {
        setMessage("");
        setAppliedStyle({});
      }, 3000);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const addBlog = async (e) => {
    e.preventDefault();
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    try {
      const returnedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(returnedBlog));
      setAuthor("");
      setUrl("");
      setTitle("");
      setMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      setAppliedStyle(green);
      blogFormRef.current.toggleVisibility();
      setTimeout(() => {
        setMessage("");
        setAppliedStyle({});
        setBlogVisible(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? "none" : "" };
    const showWhenVisible = { display: blogVisible ? "" : "none" };
    return (
      <>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <h3>create a new blog</h3>
          <form onSubmit={addBlog}>
            title:
            <input value={newTitle} onChange={handleTitleChange} />
            author:
            <input value={newAuthor} onChange={handleAuthorChange} />
            url:
            <input value={newUrl} onChange={handleUrlChange} />
            <button type="submit">create</button>
          </form>
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </>
    );
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleReset = () => {
    setPassword("");
    setUsername("");
  };

  const loginForm = () => {
    return (
      <>
        <h2>log in to application </h2>
        <Notification message={message} appliedStyle={appliedStyle} />
        <form onSubmit={handleSubmitLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
          <button type="reset" onClick={handleReset}>
            cancel
          </button>
        </form>
      </>
    );
  };

  return (
    <div>
      <div>
        {user === null ? (
          loginForm()
        ) : (
          <div>
            <h2>blogs</h2>
            <Notification message={message} appliedStyle={appliedStyle} />
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
            {blogForm()}
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
