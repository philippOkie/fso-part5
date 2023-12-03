const BlogMoreInfo = ({ blog, handleLikeBlog }) => {
  return (
    <div>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      {blog.likes} <button onClick={handleLikeBlog}>like</button>
    </div>
  );
};

export default BlogMoreInfo;
