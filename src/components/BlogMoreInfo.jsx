const BlogMoreInfo = ({ blog, handleLikeBlog, handleRemoveBlog }) => {
  return (
    <div>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      {blog.likes} <button onClick={handleLikeBlog}>like</button>
      <button onClick={handleRemoveBlog}>remove</button>
    </div>
  );
};

export default BlogMoreInfo;
