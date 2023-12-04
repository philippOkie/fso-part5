import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogMoreInfo from "./components/BlogMoreInfo";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [appliedStyle, setAppliedStyle] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(
        blogs.sort((a, b) =>
          a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0
        )
      );
    };

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
  const blogRef = useRef();

  const green = {
    color: "green",
    border: "green 2px solid",
  };

  const red = {
    color: "red",
    border: "red 2px solid",
  };

  const blogStyle = {
    border: "solid 1px black",
    height: "auto",
    margin: "0.5%",
    display: "flex",
    flexDirection: "column",
  };

  const handleLikeBlog = async (id) => {
    try {
      const blog = blogs.find((b) => b.id === id);
      const changedBlog = { ...blog, likes: blog.likes + 1 };

      const returnedBlog = await blogService.update(id, changedBlog);

      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);

    await blogService.remove(id);

    setBlogs(blogs.filter((blog) => blog.id !== id));
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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    setMessage(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
    );
    setAppliedStyle(green);

    setTimeout(() => {
      setMessage("");
      setAppliedStyle({});
    }, 3000);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const handleReset = () => {
    setPassword("");
    setUsername("");
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

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
            <div key={blog.id} style={blogStyle}>
              <Blog blog={blog} />
              <Togglable buttonLabel="view" ref={blogRef}>
                <BlogMoreInfo
                  blog={blog}
                  handleLikeBlog={() => handleLikeBlog(blog.id)}
                  handleRemoveBlog={() => handleRemoveBlog(blog.id)}
                />
              </Togglable>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
