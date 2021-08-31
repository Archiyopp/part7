import React from 'react';
import { Link } from 'react-router-dom';
const Blog = ({ blog }) => {
  const { title, author, id } = blog;
  return (
    <div className="blog">
      <Link to={`/blogs/${id}`}>
        {title} {author}{' '}
      </Link>
    </div>
  );
};

export default Blog;
