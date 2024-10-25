import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import CreateBlog from './CreateBlog';

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            const response = await axios.get('http://localhost:5000/blogs', {
                params: {
                    user_id: localStorage.getItem('userId'),
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBlogs(response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error Fetching Blogs',
                text: error.response?.data?.message || error.message,
            });
            if (error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out of your account.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                Swal.fire(
                    'Logged out!',
                    'You have been successfully logged out.',
                    'success'
                );
                navigate('/login');
            }
        });
    };


    return (
        <div className="container flex flex-col gap-12 mx-auto p-4 py-10 font-figtree">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">My Blogs</h1>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-200 hover:text-indigo-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
                <div className='flex gap-8 flex-wrap'>
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog.id} className="p-4 rounded-md border-2 border-yellow-100 shadow-sm bg-yellow-50 w-[24.5rem]">
                                <h2 className="text-xl font-semibold line-clamp-1">{blog.title}</h2>
                                <p className='text-md line-clamp-2'>{blog.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>No blogs available.</p>
                    )}
                </div>
            </div>
            <CreateBlog onBlogCreated={fetchBlogs} />
        </div>
    );
};

export default HomePage;
