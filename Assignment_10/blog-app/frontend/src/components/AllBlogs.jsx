import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/allBlogs');
            setBlogs(response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error Fetching Blogs',
                text: error.response?.data?.message || error.message,
            });
        }
    };

    return (
        <div className="container flex flex-col gap-7 mx-auto p-4 py-11 font-figtree">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">All Blogs</h1>
                <Link to={'/login'} className="px-6 py-2 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-200 hover:text-indigo-600 transition duration-300">
                    {token ? "My Dashboard" : "Login"}
                </Link>
            </div>
            <div className='flex gap-8 flex-wrap'>
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog.id} className="p-4 rounded-md border-2 border-yellow-100 shadow-sm bg-yellow-50 w-96">
                            <h2 className="text-xl font-semibold line-clamp-1">{blog.title}</h2>
                            <p className='text-md line-clamp-2'>{blog.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No blogs available.</p>
                )}
            </div>
        </div>
    )
}

export default AllBlogs