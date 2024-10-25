import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreateBlog = ({ onBlogCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            Swal.fire({
                icon: 'error',
                title: 'Please fill in all fields.',
                text: 'Title and content are required.',
            });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Cannot Create Blog.',
                    text: 'You must be logged in to create a blog.',
                }).then(() => navigate('/login'));
            }


            const response = await axios.post(
                'http://localhost:5000/blogs',
                {
                    title,
                    content,
                    user_id: localStorage.getItem('userId'),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            setTitle('');
            setContent('');

            if (onBlogCreated) {
                onBlogCreated(response.data);
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error Creating Blog',
                text: err.response?.data?.message || err.message,
            });
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
            <form onSubmit={handleSubmit} className='w-full'>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="px-2 py-2 w-full border-indigo-200 rounded-lg border-2 font-medium"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-md text-gray-700 font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        id="content"
                        rows="6"
                        className="px-2 py-2 w-full border-indigo-200 rounded-lg border-2 font-medium"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-200 hover:text-indigo-600 transition duration-300"
                >
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
