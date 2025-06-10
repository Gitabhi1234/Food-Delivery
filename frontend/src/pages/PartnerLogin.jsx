import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import PartnerDataContext from '../context/PartnerDataContext'
import axios from 'axios'

const PartnerLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   
    const navigate = useNavigate()

    const {partner,setPartner} = React.useContext(PartnerDataContext)
  
    const submitHandler =async (e) => {
      e.preventDefault()
    
      const partner = {
        email: email,
        password: password
      }

      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/partners/login`, partner)
      
      if(response.status ===200){
        const data = response.data
        setPartner(data.partner)
        localStorage.setItem('token', data.token)
        navigate('/partner-home')
      }

      setEmail('')
      setPassword('') }
  return (
     <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 ml-2 pb-7 ' src="https://cdn-icons-png.flaticon.com/128/3063/3063822.png" alt="" />
           
        <form onSubmit={(e) =>
         {submitHandler(e)}}>
          <h3  className=
          'text-lg font-medium mb-2'> What's your Email  </h3>
          <input 
          required 
          value={email}
          onChange={(e) => 
          setEmail(e.target.value)
          }
          className='rouded bg-[#eeeeee] mb-7 px-4 py-2 border w-full text-lg placeholder:text-base'
          type="email" 
          placeholder='example@gmail.com' />
          <h3 className=
          'text-lg font-medium mb-2'>Enter Password </h3>
          <input 
          required 
          value={password}
          onChange={(e) => 
          setPassword(e.target.value)
          }
          className='rouded bg-[#eeeeee] mb-7 px-4 py-2 border w-full text-lg placeholder:text-base'
          type="password"
          placeholder='password' />
          <button  className='rouded bg-[#111] text-white font-semibold mb-3 px-4 py-2 border w-full text-lg placeholder:text-base' type='submit'>Login</button>
        
        </form>
       <p className='text-center-align'>Join a fleet? <Link to='/partner-signup' className='text-blue-600'> Register as a delivary Partner</Link></p>
      </div>
      <div>
         <Link  to='/login'
         className='rouded bg-[#744949] flex items-center justify-center text-white font-semibold mb-7 px-4 py-2 border w-full text-lg placeholder:text-base'
         type='submit'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default PartnerLogin
