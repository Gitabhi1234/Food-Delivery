import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PartnerDataContext from '../context/PartnerDataContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PartnerSignup = () => {
   const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState(""); 

    const [vehicleColor, setVehicleColor] = useState("");
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleType, setVehicleType] = useState("");

    const navigate = useNavigate();

    const {partner, setPartner } = React.useContext(PartnerDataContext);
  
    const submitHandler =async (e) => {
      e.preventDefault();
      const partnerData = {
        fullname:{
          firstname: firstname,
          lastname: lastname
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          vehicleType: vehicleType
        }
      }
     const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/partners/register`, partnerData)
      
     if(response.status === 201){
        const data=response.data;

        setPartner(data.partner);
        localStorage.setItem('token', data.token);
        navigate('/partner-home')
     }
      setEmail("")
      setPassword("")
      setFirstName("")
      setLastName("")
      setVehicleColor("")
      setVehiclePlate("")
      setVehicleType("")
  
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
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            className="rouded bg-[#eeeeee]  px-4 py-2 border w-1/2 text-base placeholder:text-sm"
            type="text"
            placeholder="first name"
          />
          <input
            required
            value={lastname}
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
           <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex  mb-7'>
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">car</option>
              <option value="auto">auto</option>
              <option value="moto">motorcycle</option>
            </select>
          </div>

          
          <button
            className="rouded bg-[#111] text-white font-semibold mb-3 px-4 py-2 border w-full text-base placeholder:text-sm"
            type="submit"
          >
            Create Partner Account
          </button>

        </form>
          <p className="text-center-align">
            Already have a account?
            <Link to="/partner-login" className="text-blue-600">
              
              Login here
            </Link>
          </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">This sight is protected by reCAPTCHA and the <span className="text-blue-600 underline">Google Privacy Policy</span> and <span className="underline text-blue-500">Terms of Services apply</span>.  </p>
        <Link
          to="/login"
          className="rouded bg-[#744949] flex items-center justify-center text-white font-semibold mb-7 px-4 py-2 border w-full text-lg placeholder:text-base"
          type="submit"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default PartnerSignup
