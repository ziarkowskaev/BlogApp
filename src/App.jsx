import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

import { useNotificationDispatch } from "./NotificationContex";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  const blogFormRef = useRef();

  const dispatchNotification = useNotificationDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(compareBlogs)));
  }, []);

  function compareBlogs(a, b) {
    return a.likes < b.likes;
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      

    dispatchNotification({
      type: 'SET_NOTIFICATION',
      payload: { message: `Logged in user ${username}`}
    });
      setUsername("");
      setPassword("");
      
      
    } catch (exception) {

    dispatchNotification({
      type: 'SET_NOTIFICATION',
      payload: { message: `Wrong credentials`}
    });
    }
  };
  const handleLogOut = async (event) => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
    setUsername("");
    setPassword("");
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: { message: `Blog ${blogObject.title} by ${blogObject.author} created!`}
      });
    });
  };

  const addLike = (id) => {
    const blog = blogs.find((blog) => blog.id === id);

    const blogLikes = blog.likes;

    const changedBlog = { ...blog, likes: blogLikes + 1 };

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(
          blogs.map((b) =>
            b.id !== id ? b : { ...returnedBlog, user: blog.user },
          ),
        );
        dispatchNotification({
          type: 'SET_NOTIFICATION',
          payload: { message: `Liked ${blog.title}`}
        });
      })
      .catch((error) => {
        console.log(error);

    
      });
  };

  const deleteBlog = (id) => {
    const blogFind = blogs.find((blog) => blog.id === id);
    if (confirm("Remove " + blogFind.title + " by " + blogFind.author)) {
      const blog = blogs.filter((blog) => blog.id !== id);
      blogService
        .deleteBlog(id)
        .then(setBlogs(blog))
        .catch((error) => {
          console.log(error);
          dispatchNotification({
            type: 'SET_NOTIFICATION',
            payload: { message: `Error when deleting`}
          });
        });
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      {!user && loginForm()}

      {user && (
        <div>
          <div>
            {user.name} logged in
            <button onClick={() => handleLogOut()}>Log out</button>
          </div>

          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={addLike}
              authUser={user}
              handleDelete={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
