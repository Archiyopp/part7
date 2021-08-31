import React, { useState, useEffect } from 'react';
import AddBlog from './components/addBlog';
import Blog from './components/Blog';
import LoginForm from './components/loginForm';
import {
  create,
  getAll,
  remove,
  setToken,
  update,
} from './services/blogs';
import {
  asyncSuccess,
  asyncFailure,
  selectNotis,
} from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const dispatch = useDispatch();
  const { notification, success } = useSelector(selectNotis);

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser =
      window.localStorage.getItem('loggedBlogAppUser') || null;
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const createBlog = async (newObject) => {
    try {
      const returnedBlog = await create(newObject);
      setBlogs([...blogs, returnedBlog]);
      dispatch(
        asyncSuccess(
          `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
      );
    } catch (e) {
      dispatch(asyncFailure(e.message));
    }
  };

  const blogsToDisplay = [...blogs]
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => {
      const { title, author, likes, url, user, id } = blog;
      const deleteBlog = async () => {
        const confirm = window.confirm(
          'Are you sure you want to delete this post?'
        );
        if (confirm) {
          try {
            await remove(id);
            setBlogs([...blogs.filter((blog) => blog.id !== id)]);
            dispatch(asyncSuccess('Successfully removed blog'));
          } catch (e) {
            dispatch(
              asyncFailure('You are not the owner of the blog')
            );
          }
        }
      };
      const likeBlog = async () => {
        const newBlog = {
          title,
          author,
          likes: likes + 1,
          url,
          user: user?.id,
        };
        try {
          const updatedBlog = await update(id, newBlog);
          setBlogs([
            ...blogs.filter((blog) => blog.id !== id),
            updatedBlog,
          ]);
        } catch (e) {
          console.error(e.message);
        }
      };
      return (
        <Blog
          key={id}
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
        />
      );
    });

  return (
    <div className="container">
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <>
          <h2>blogs</h2>
          {notification && (
            <p className={`${success ? 'notification' : 'error'}`}>
              {notification}
            </p>
          )}
          <p>
            {user.name} logged-in{' '}
            <button
              onClick={() => {
                window.localStorage.removeItem('loggedBlogAppUser');
                setUser(null);
              }}
              className="btn"
              id="logout"
            >
              Log out
            </button>
          </p>
          {showCreateForm ? (
            <AddBlog
              hideCreateForm={() => setShowCreateForm(false)}
              createBlog={createBlog}
            />
          ) : (
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn"
              id="show-create-blog"
            >
              Create new blog
            </button>
          )}
          {blogsToDisplay}
        </>
      )}
    </div>
  );
};

export default App;
