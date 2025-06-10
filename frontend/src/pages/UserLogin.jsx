import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import UserDataContext from '../context/UserDataContext'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const navigate = useNavigate();

  const {user,setUser} = React.useContext(UserDataContext)

  const submitHandler =async (e) => {
    e.preventDefault()
  
    const userData={
      email: email,
      password: password
    }
    const response=await axios.post( `${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    
    if(response.status===200){
      const data=response.data;
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')
    }
    setEmail('')
    setPassword('') 

  }
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
       <p className='text-center-align'>New here? <Link to='/signup' className='text-blue-600'> Create New Account</Link></p>
      </div>
      <div>
         <Link  to='/partner-login'
         className='rouded bg-[green] flex items-center justify-center text-white font-semibold mb-7 px-4 py-2 border w-full text-lg placeholder:text-base'
         type='submit'>Sign in as Partner</Link>
      </div>
    </div>
  )
}

export default UserLogin
