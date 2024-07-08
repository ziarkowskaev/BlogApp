import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useNotificationDispatch } from './NotificationContex';
const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [loginVisible, setLoginVisible] = useState(false);

    const blogFormRef = useRef();

    const queryClient = useQueryClient();
    const dispatchNotification = useNotificationDispatch();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
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
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user),
            );
            blogService.setToken(user.token);
            setUser(user);

            dispatchNotification({
                type: 'SET_NOTIFICATION',
                payload: { message: `Logged in user ${username}` },
            });
            setUsername('');
            setPassword('');
        } catch (exception) {
            dispatchNotification({
                type: 'SET_NOTIFICATION',
                payload: { message: `Wrong credentials` },
            });
        }
    };
    const handleLogOut = async (event) => {
        window.localStorage.removeItem('loggedNoteappUser');
        setUser(null);
        setUsername('');
        setPassword('');
    };

    const loginForm = () => {
        const hideWhenVisible = { display: loginVisible ? 'none' : '' };
        const showWhenVisible = { display: loginVisible ? '' : 'none' };

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setLoginVisible(true)}>
                        Log in
                    </button>
                </div>
                <div style={showWhenVisible}>
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) =>
                            setUsername(target.value)
                        }
                        handlePasswordChange={({ target }) =>
                            setPassword(target.value)
                        }
                        handleSubmit={handleLogin}
                    />
                    <button onClick={() => setLoginVisible(false)}>
                        cancel
                    </button>
                </div>
            </div>
        );
    };

    const updateBlogMutation = useMutation({
        mutationFn: blogService.update,
        onSuccess: (updatedBlog) => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            dispatchNotification({
                type: 'SET_NOTIFICATION',
                payload: { message: `blog '${updatedBlog.title}' liked` },
            });
        },
    });
    const addLike = (blog) => {
        updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
    };

    const deleteBlogMutation = useMutation({
        mutationFn: blogService.deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            dispatchNotification({
                type: 'SET_NOTIFICATION',
                payload: { message: `blog deleted` },
            });
        },
    });

    const deleteBlog = (blog) => {
        deleteBlogMutation.mutate({...blog});
    };

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        retry: false,
    });

    // console.log(JSON.parse(JSON.stringify(result)))

    if (result.isLoading) {
        return <div>loading data...</div>;
    }
    if (result.isError) {
        return <span>Error: {result.error.message}</span>;
    }

    const blogs = result.data.sort(compareBlogs);
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
                        <BlogForm />
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
