import { useState } from "react";

const BlogForm = () => {
  const [newAuthor, setAuthor] = useState("");
  const [newTitle, setTitle] = useState("");
  const [newUrl, setUrl] = useState("");
  const [blogVisible, setBlogVisible] = useState(false);
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

export default BlogForm;
