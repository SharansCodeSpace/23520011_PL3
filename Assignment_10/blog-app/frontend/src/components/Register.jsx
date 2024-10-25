import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import API from '../api';

const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [otp, setOtp] = useState('');
	const [step, setStep] = useState(1);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate('/dashboard');
		}
	}, [navigate]);


	const handleRegister = (e) => {
		e.preventDefault();
		API.post('/auth/register', { username, email, password })
			.then((response) => {
				Swal.fire({
					icon: 'success',
					title: 'OTP Sent!',
					text: 'An OTP has been sent to your email. Please verify it.',
				});
				setStep(2);
			})
			.catch((error) => {

				if (error.response && error.response.status === 400 && error.response.data.error === 'User already exists') {
					Swal.fire({
						icon: 'error',
						title: 'User already exists',
						text: 'This email is already registered. Please use a different email.',
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Registration Failed',
						text: 'An error occurred during registration. Please try again.',
					});
				}
			});
	};


	const handleVerifyOtp = (e) => {
		e.preventDefault();
		API.post('/auth/verify-otp', { username, email, password, otp })
			.then((response) => {
				Swal.fire({
					icon: 'success',
					title: 'Registration Successful!',
					text: 'You have successfully registered. Redirecting to login page...',
				}).then(() => {
					navigate('/login');
				});
			})
			.catch((error) => {
				Swal.fire({
					icon: 'error',
					title: 'Invalid OTP',
					text: 'The OTP you entered is incorrect. Please try again.',
				});
			});
	};

	return (
		<div className="container w-1/2 h-screen flex flex-col items-center justify-center mx-auto p-4 font-figtree">
			<h1 className="text-3xl font-bold mb-4">Register</h1>

			{step === 1 && (
				<form onSubmit={handleRegister} className="flex w-1/2 flex-col space-y-4">
					<div>
						<label className="block text-md mb-2 font-medium text-gray-700">Username</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="px-2 py-2 w-full border-indigo-200 rounded-lg border-2 font-medium"
							placeholder="Enter your username"
							required
						/>
					</div>
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
						<label className="block text-md mb-2 font-medium text-gray-700">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="px-2 py-2 w-full border-indigo-200 rounded-lg border-2 font-medium"
							placeholder="Enter your password"
							required
						/>
					</div>
					<button type="submit" className="px-6 py-2 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-200 hover:text-indigo-600 transition duration-300">
						Register
					</button>
				</form>
			)}

			{step === 2 && (
				<form onSubmit={handleVerifyOtp} className="flex w-1/2 flex-col space-y-4">
					<div>
						<label className="block text-md mb-2 font-medium text-gray-700">Enter OTP</label>
						<input
							type="text"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							className="px-2 py-2 w-full border-indigo-200 rounded-lg border-2 font-medium"
							placeholder="Enter the OTP sent to your email"
						/>
					</div>
					<button type="submit" className="px-6 py-2 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-200 hover:text-indigo-600 transition duration-300">
						Verify OTP
					</button>
				</form>
			)}

			{step === 1 && (
				<a href="/login" className="text-indigo-800 text-center mt-3">Already Registered? Login here</a>
			)}
		</div>
	);
};

export default Register;