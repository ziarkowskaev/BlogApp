import Togglable from './Togglable';
import { useRef } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch,
} from 'react-router-dom';
const Blog = ({ blog, handleLike, authUser, handleDelete }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };
    const blogDetailsRef = useRef();

    return (
        <div className="blog" style={blogStyle}>
            <div style={{ margin: '8px' }}>
                <Link to={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                </Link>
            </div>
            {/* <Togglable buttonLabel="View details" ref={blogDetailsRef}>
                <ul>
                    <li>{blog.url}</li>
                    <li data-testid="likes">
                        Likes {blog.likes}{' '}
                        <button onClick={() => handleLike(blog)}>Like</button>
                    </li>
                    <li>
                        {blog.user.name ? blog.user.name : blog.user.username}
                    </li>
                </ul>
                {authUser.id === blog.user.id && (
                    <button
                        style={{
                            backgroundColor: '#008CBA',
                            border: 'none',
                            borderRadius: '5px',
                        }}
                        onClick={() => handleDelete(blog)}
                    >
                        Delete
                    </button>
                )}
            </Togglable> */}
        </div>
    );
};

export default Blog;
