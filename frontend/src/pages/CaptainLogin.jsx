import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {CaptainDataContext} from '../context/CaptainContext'


function CaptainLogin()  {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const {captain, setCaptain}=React.useContext(CaptainDataContext) // destructuring the data of captain and setcaptain from captain context
  // handle form submission event here with the email and password values
  // and handle any server-side validation or error messages appropriately.
  // For example, you could use the fetch API to send a POST request to the server's '/login' endpoint.
  // Once the server responds with a valid token, you could set the token in a cookie or local storage,
  // and redirect the user to the home page.

  const handleSubmit = async( e) => {
    e.preventDefault()
    const captain={
      email:email,
      password:password
    }
    // send the form data to the server
    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,captain)
    if(response.status==200){
      const data=response.data;
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    console.log(email, password)
    setEmail("")
    setPassword("")

    // send the form data to the server
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
          <input type="text" 
          placeholder='enter your email'
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
              />
          <input type="password" 
          placeholder='enter your password' 
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}/>
          <button type='submit'>Login</button>  
          <p>don't have a account? <Link to="/captain/register">Create</Link></p> 
      </form>
      <button type='submit' onClick={()=>navigate('/user/login')}>Sign in as User</button>
    </div>
  )
}

export default CaptainLogin