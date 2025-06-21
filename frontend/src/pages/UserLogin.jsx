import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserDataContext from '../context/UserDataContext';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const userData = {
      email: email.trim(),
      password: password
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => navigate('/user-home'), 1000);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Login failed. Please check your credentials.';
      setError(msg);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 ml-2 pb-7"
          src="https://cdn-icons-png.flaticon.com/128/3063/3063822.png"
          alt="Logo"
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded bg-[#eeeeee] mb-7 px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="example@gmail.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded bg-[#eeeeee] mb-4 px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

          <button
            type="submit"
            className="rounded bg-[#111] text-white font-semibold mb-3 px-4 py-2 border w-full text-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            Create New Account
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/partner-login"
          className="rounded bg-[green] flex items-center justify-center text-white font-semibold mt-6 px-4 py-2 border w-full text-lg"
        >
          Sign in as Partner
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
