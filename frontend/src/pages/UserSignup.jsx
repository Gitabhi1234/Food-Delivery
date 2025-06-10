import React from "react";
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import UserDataContext from "../context/UserDataContext";



const UserSignup = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); 

  const {user,setUser}=React.useContext(UserDataContext)

  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();
    const newUser={
       fullname:{
          firstname: firstName,
          lastname: lastName
        },
      email: email, 
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
    

    if(response.status===201){
      const data=response.data;

      setUser(data.user)
      localStorage.setItem('token',data.token)

      navigate("/home")
    }

    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")

  };
  
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 ml-2 pb-7 "
          src="https://cdn-icons-png.flaticon.com/128/3063/3063822.png"
          alt=""
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-base font-medium mb-2"> What's your Name </h3>
          <div className="flex gap-4 mb-6">
            <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="rouded bg-[#eeeeee]  px-4 py-2 border w-1/2 text-base placeholder:text-sm"
            type="text"
            placeholder="first name"
          />
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="rouded bg-[#eeeeee] px-4 py-2 border w-1/2 text-base placeholder:text-sm"
            type="text"
            placeholder="last name"
          />
          </div>

          <h3 className="text-base font-medium mb-2"> What's your email </h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rouded bg-[#eeeeee] mb-6 px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            placeholder="example@gmail.com"
          />
          <h3 className="text-base mb-2 font-medium">Enter Password </h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rouded bg-[#eeeeee] mb-6 px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            placeholder="password"
          />
          <button
            className="rouded bg-[#111] text-white font-semibold mb-3 px-4 py-2 border w-full text-base placeholder:text-sm"
            type="submit"
          >
            SignUp
          </button>

        </form>
          <p className="text-center-align">
            Already have a account?
            <Link to="/login" className="text-blue-600">
              
              Login here
            </Link>
          </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">This sight is protected by reCAPTCHA and the <span className="text-blue-600 underline">Google Privacy Policy</span> and <span className="underline text-blue-500">Terms of Services apply</span>.  </p>
        <Link
          to="/partner-login"
          className="rouded bg-[green] flex items-center justify-center text-white font-semibold mb-7 px-4 py-2 border w-full text-lg placeholder:text-base"
          type="submit"
        >
          Sign in as Partner
        </Link>
      </div>
    </div>
  );
};

export default UserSignup;
