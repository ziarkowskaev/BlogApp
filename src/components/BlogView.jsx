import Togglable from './Togglable';
import { useRef } from 'react';
const BlogView = ({ blog, handleLike }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2 className="card-title">
                    {blog.title} by {blog.author}
                </h2>
                <a href={blog.url} className="card-link">
                    {blog.url}
                </a>
                <div className="mt-3">
                    <span>{blog.likes} likes</span>
                    <button
                        onClick={() => handleLike(blog)}
                        className="btn btn-primary btn-sm ml-2"
                    >
                        Like
                    </button>
                </div>
                <div className="mt-2 text-muted">Added by {blog.user.name}</div>
            </div>
        </div>
    );
};

export default BlogView;
