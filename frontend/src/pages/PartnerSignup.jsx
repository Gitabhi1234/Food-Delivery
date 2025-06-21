import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PartnerDataContext from '../context/PartnerDataContext';
import axios from 'axios';

const PartnerSignup = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState(""); 
  const [hotelname, setHotelName] = useState("");

  const navigate = useNavigate();
  const { partner, setPartner } = useContext(PartnerDataContext);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const partnerData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      hotelname: hotelname,
      email: email,
      password: password,
    };
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/partners/register`,
        partnerData
      );
      
      if (response.status === 201) {
        const data = response.data;
        setPartner(data.partner);
        localStorage.setItem('token', data.token);
        navigate('/partner-home1');
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
    
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setHotelName("");
  };
    
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 ml-2 pb-7"
          src="https://cdn-icons-png.flaticon.com/128/3063/3063822.png"
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-base font-medium mb-2">What's your Name</h3>
          <div className="flex gap-4 mb-6">
            <input
              required
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded bg-[#eeeeee] px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              type="text"
              placeholder="First name"
            />
            <input
              required
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded bg-[#eeeeee] px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              type="text"
              placeholder="Last name"
            />
          </div>
          <h3 className="text-base font-medium mb-2">What's your Hotel Name</h3>
          <input
            required
            value={hotelname}
            onChange={(e) => setHotelName(e.target.value)}
            className="rounded bg-[#eeeeee] mb-6 px-4 py-2 border w-full text-base placeholder:text-sm"
            type="text"
            placeholder="Hotel Name"
          />
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
            className="rounded bg-[#eeeeee] mb-6 px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            placeholder="Password"
          />
          <button
            className="rounded bg-[#111] text-white font-semibold mb-3 px-4 py-2 border w-full text-base"
            type="submit"
          >
            Create Partner Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <Link to="/partner-login" className="text-blue-600">
            {" "}Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the <span className="text-blue-600 underline">Google Privacy Policy</span> and <span className="underline text-blue-500">Terms of Services apply</span>.
        </p>
        <Link
          to="/login"
          className="rounded bg-[#744949] flex items-center justify-center text-white font-semibold mb-7 px-4 py-2 border w-full text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default PartnerSignup;
