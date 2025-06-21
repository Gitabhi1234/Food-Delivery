import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserDataContext from "../context/UserDataContext";

const UserSignup = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); 

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const newUser = {
      fullname: {
        firstname: firstName.trim(),
        lastname: lastName.trim()
      },
      email: email.trim(),
      password: password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        setSuccess("Account created successfully!");
        setTimeout(() => navigate("/user-home"), 1000);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed. Please try again.";
      setError(msg);
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
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
          <h3 className="text-base font-medium mb-2">What's your Name</h3>
          <div className="flex gap-4 mb-6">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded bg-[#eeeeee] px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              type="text"
              placeholder="First name"
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded bg-[#eeeeee] px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              type="text"
              placeholder="Last name"
            />
          </div>

          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded bg-[#eeeeee] mb-6 px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            placeholder="example@gmail.com"
          />

          <h3 className="text-base mb-2 font-medium">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded bg-[#eeeeee] mb-4 px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            placeholder="Password"
          />

          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm mb-4">{success}</p>
          )}

          <button
            type="submit"
            className="rounded bg-[#111] text-white font-semibold mb-3 px-4 py-2 border w-full text-base"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="text-blue-600 underline">Google Privacy Policy</span> and{" "}
          <span className="underline text-blue-500">Terms of Service</span> apply.
        </p>
        <Link
          to="/partner-login"
          className="rounded bg-green-600 flex items-center justify-center text-white font-semibold mt-4 px-4 py-2 w-full text-lg"
        >
          Sign in as Partner
        </Link>
      </div>
    </div>
  );
};

export default UserSignup;
