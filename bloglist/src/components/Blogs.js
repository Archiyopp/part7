import { useSelector } from 'react-redux';
import { selectBlogs } from '../reducers/blogsReducer';
import {} from '../reducers/notificationReducer';
import Blog from './Blog';
import React from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { Paper } from '@material-ui/core';

const Blogs = () => {
  const blogs = useSelector(selectBlogs);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => {
              return <Blog key={blog.id} blog={blog} />;
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Blogs;
