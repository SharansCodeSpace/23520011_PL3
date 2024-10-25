import React, { useState, useEffect } from 'react';
import API from '../api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();

        API.post('/auth/login', { email, password })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user.id);
                navigate('/dashboard');
            })
            .catch((error) => Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid Username or Password',
            }));
    };

    return (
        <div className="container w-1/2 h-screen flex flex-col items-center justify-center mx-auto p-4 font-figtree">
            <h1 className="text-3xl font-bold mb-4 w-1/2 text-center">Login</h1>
            <form onSubmit={handleLogin} className="flex w-1/2 flex-col space-y-4">
                <div>
                    <label className="block text-md mb-2 font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-2 py-2 w-full border-indigo-200 rounded-lg border-2 font-medium"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label className="block text-md font-medium text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-2 py-2 w-full border-indigo-200 rounded-lg border-2 font-medium"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {/* Add new user registration link */}
                <button type="submit" className="px-6 py-2 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-200 hover:text-indigo-600 transition duration-300">
                    Login
                </button>
                <a href="/register" className="text-indigo-800 text-center">New user? Register here</a>
            </form>
        </div>
    );
};

export default Login;
