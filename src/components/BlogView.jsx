import Togglable from './Togglable';
import { useRef } from 'react';
const BlogView = ({ blog, handleLike}) => {


    return (
        <div>
            <h2>{blog.title} by {blog.author}</h2>
            
            <a href={blog.url}>{blog.url}</a>
            <div>{blog.likes} <button onClick={() => handleLike(blog)}>Like</button></div>
            <div>added by {blog.user.name}</div>
            
        </div>
    );
};

export default BlogView;
