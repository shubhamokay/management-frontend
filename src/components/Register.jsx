import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role set to 'user'
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://management-backend-oput.onrender.com/api/users/register', { username, password, role }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }
      });
      alert('User registered successfully');
    } catch (error) {
      console.error('Error registering user', error.response?.data || error.message);
    }
  };

  //   try {
  //     await axios.post(`https://management-backend-oput.onrender.com/api/users/register`, {
  //       username,
  //       password,
  //       role,
  //     });
  //   } catch (error) {
  //     setError('Registration failed. Please try again.');
  //   }
  // };

  return (
    <div className="register-container max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
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
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="stockManager">Stock Manager</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
