import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newAuthor, setAuthor] = useState("");
  const [newTitle, setTitle] = useState("");
  const [newUrl, setUrl] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const addBlog = (e) => {
    e.preventDefault();

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setAuthor("");
    setUrl("");
    setTitle("");
  };

  return (
    <div>
      <h3>create a new blog</h3>
      <form onSubmit={addBlog}>
        title:
        <input
          aria-label="title:"
          value={newTitle}
          onChange={handleTitleChange}
        />
        author:
        <input
          aria-label="author:"
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        url:
        <input aria-label="url:" value={newUrl} onChange={handleUrlChange} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
