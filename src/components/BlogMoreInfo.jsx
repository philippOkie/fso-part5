const BlogMoreInfo = ({ blog }) => {
  const blogStyle = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div>
      <div style={blogStyle}>
        {blog.author} {blog.url} {blog.likes} <button>like</button>
      </div>
    </div>
  );
};

export default BlogMoreInfo;
