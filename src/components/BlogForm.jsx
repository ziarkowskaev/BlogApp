import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { useNotificationDispatch } from '../NotificationContex';
const BlogForm = () => {
    const queryClient = useQueryClient();
    const dispatchNotification = useNotificationDispatch();

    const newBlogMutation = useMutation({
        mutationFn: blogService.create,
        onSuccess: (newBlog) => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            const blogs = queryClient.getQueryData({ queryKey: ['blogs'] });
            queryClient.setQueryData(
                { queryKey: ['blogs'] },
                blogs.concat(newBlog),
            );
            dispatchNotification({
                type: 'SET_NOTIFICATION',
                payload: {
                    message: `Blog ${blogObject.title} by ${blogObject.author} created!`,
                },
            });
        },
    });

    const addBlog = async (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const author = event.target.author.value;
        const url = event.target.url.value;
        event.target.title.value = '';
        event.target.author.value = '';
        event.target.url.value = '';
        newBlogMutation.mutate({ title, author, url });
    };

    return (
        <div
            style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h2 style={{ color: '#343a40', marginBottom: '20px' }}>
                Create a New Blog
            </h2>
            <form onSubmit={addBlog}>
                <div style={{ marginBottom: '15px' }}>
                    <label
                        htmlFor="title"
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                        }}
                    >
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter blog title"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ced4da',
                            borderRadius: '5px',
                            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label
                        htmlFor="author"
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                        }}
                    >
                        Author:
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Enter author's name"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ced4da',
                            borderRadius: '5px',
                            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label
                        htmlFor="url"
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                        }}
                    >
                        URL:
                    </label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        placeholder="Enter blog URL"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ced4da',
                            borderRadius: '5px',
                            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        display: 'inline-block',
                        width: '100%',
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#fff',
                        backgroundColor: '#007bff',
                        border: 'none',
                        borderRadius: '5px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition:
                            'background-color 0.3s ease, transform 0.2s ease',
                    }}
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
