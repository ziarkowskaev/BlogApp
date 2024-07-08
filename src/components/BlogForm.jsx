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
        const author = event.target.title.value;
        const url = event.target.title.value;
        event.target.title.value = '';
        event.target.author.value = '';
        event.target.url.value = '';
        newBlogMutation.mutate({ title, author, url });
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input name="title" />
                </div>
                <div>
                    Author:
                    <input name="author" />
                </div>
                <div>
                    url:
                    <input name="url" />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default BlogForm;
