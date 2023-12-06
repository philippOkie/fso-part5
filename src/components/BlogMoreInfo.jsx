const BlogMoreInfo = ({ blog, handleLikeBlog, handleRemoveBlog, user }) => {
  return (
    <div>
      {/* {console.log(blog)}
      {console.log(user)} */}
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      {`Likes: ${blog.likes}`} <button onClick={handleLikeBlog}>like</button>
      {user.username === blog.author && (
        <button onClick={handleRemoveBlog}>remove</button>
      )}
    </div>
  );
};

export default BlogMoreInfo;
