import { createSlice } from '@reduxjs/toolkit';
import { getAll, create, remove, update } from '../services/blogs';

export const blogsSlice = createSlice({
  name: 'blogList',
  initialState: {
    blogs: [],
  },
  reducers: {
    initBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    removeBlog: (state, action) => {
      state.blogs = state.blogs.filter(
        (blog) => blog.id !== action.payload
      );
    },
    likeBlog: (state, action) => {
      const blog = state.blogs.find(
        (blog) => blog.id === action.payload
      );
      blog.likes++;
    },
  },
});

const { addBlog, initBlogs, removeBlog, likeBlog } =
  blogsSlice.actions;

export const asyncAddBlog = (blog) => async (dispatch) => {
  const returnedBlog = await create(blog);
  dispatch(addBlog(returnedBlog));
};

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await getAll();
  dispatch(initBlogs(blogs));
};

export const asyncRemoveBlog = (id) => async (dispatch) => {
  await remove(id);
  dispatch(removeBlog(id));
};

export const asyncLikeBlog = (id, newBlog) => async (dispatch) => {
  await update(id, newBlog);
  dispatch(likeBlog(id));
};

export const selectBlogs = (state) => state.blogList.blogs;

export default blogsSlice.reducer;
