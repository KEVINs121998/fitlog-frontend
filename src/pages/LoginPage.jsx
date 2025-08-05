import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/auth/login', {
      email,
      password,
    });

    const token = `Bearer ${res.data.token}`;
    localStorage.setItem('token', token);
    localStorage.setItem("role", res.data.role); 

    const decoded = JSON.parse(atob(res.data.token.split('.')[1]));
    const role = decoded.role;

    if (role === 'trainer') {
      navigate('/trainer/dashboard');
    } else {
      navigate('/dashboard');
    }
  } catch (err) {
    alert('Login failed');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login to FitLog</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold"
          >
            Login
          </button>
          <p>Don't have an account? <a href="/register">Register</a></p>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
