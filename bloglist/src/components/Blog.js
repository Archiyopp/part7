import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
const Blog = ({ blog }) => {
  const { title, author, id } = blog;
  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${id}`}>{title}</Link>
      </TableCell>
      <TableCell>{author}</TableCell>
    </TableRow>
  );
};

export default Blog;
