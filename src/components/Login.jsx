import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // const {data} = axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { username, password })
    //   .then(response => {
    //     // const { token } = response.data;
    //     localStorage.setItem('token', token); // Save token to localStorage
    //     navigate('/'); // Redirect to homepage or another route
    //   })
    //   .catch(err => {
    //     setError('Invalid credentials or error logging in.');
    //     console.error('Error logging in:', err);
    //   });

    try {
        const {data} = await axios.post(`https://management-backend-oput.onrender.com/api/users/login`, { username, password });
        localStorage.setItem('token', data.token);
        setRole(data.role);
        console.log('Login successful, role:', data.role); // Debugging line
        if (data.role === 'admin') {
            navigate('/admin');
        } else if (data.role === 'stockManager') {
            navigate('/stock-manager');
        } else if (data.role === 'user') {
            navigate('/user');
        } else {
            console.error('Unknown role:', data.role); // Handle unexpected roles
        }
    } catch (error) {
        console.error('Invalid Credentials:');
    }
  };

  return (
    <div className="login-panel max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow-lg bg-white">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
