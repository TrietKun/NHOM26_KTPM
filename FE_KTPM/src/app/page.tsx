// Trong file pages/login.js
// đánh dấu client component
'use client';

import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ip from '../app/ip';

const Login = () => {

  const [user, setUser] = useState(null);


  useEffect(() => {
    console.log('User updated:', user);
  }, [user]);

  const [MSSV, setMSSV] = useState('');
  const [password, setPassword] = useState('');
  // const ip = process.env.IP

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleLogin(MSSV, password);
    e.preventDefault();
  };

  const handleLogin = async (MSSV: string, password: string) => {
    const data = {
      mssv: MSSV,
      password: password,
    };
 
    try {
      await axios.post('http://'+ip+':3001/auth/login', data)
        .then((response) => {
          console.log(response.data.data);
          if (response.data.message === 'Login success') {
            //clear local storage
            localStorage.clear();
            localStorage.setItem('user', JSON.stringify(response.data.data));
            setMSSV('');
            setPassword('');
            console.log('Login success');
            window.location.href = '/home';        
          } else {
            console.log('Login failed');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Đã xảy ra lỗi:', error);
    }
  };
  


  return (
     <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow-xl appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => setMSSV(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow-xl appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " 
            type="submit"
          >
            Sign In
          </button>
          {/* Add Forgot Password link if needed */}
        </div>
      </form>
    </div> 
  );
};

export default Login;
