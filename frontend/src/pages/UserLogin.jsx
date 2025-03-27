import axios from 'axios'
import React, { useState,useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

function UserLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [data, setData] = useState('')
  const navigate = useNavigate()

  const {user,setUser}=useContext(UserDataContext)
  // handle form submission event here with the email and password values
  // and handle any server-side validation or error messages appropriately.
  // For example, you could use the fetch API to send a POST request to the server's '/login' endpoint.
  // Once the server responds with a valid token, you could set the token in a cookie or local storage,
  // and redirect the user to the home page.

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userData={
      email:email,
      password:password
    }

    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData)
   try {
    if(response.status===200){//200 from backend 'which you never user properly' duffer
      
      
      const data=response.data;
      setUser(data) // setting user data to userContext
      localStorage.setItem('token', data.token) 
      
      
      navigate('/home')
    }
    console.log(email, password)
    setEmail("")
    setPassword("")

    
   } catch (error) {
    console.error(error)
   }// send the form data to the server
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
          <p>don't have a account? <Link to="/user/register">Create</Link></p> 
      </form>
      <button type='submit' onClick={()=>navigate('/captain/login')}>Sign in as Captain</button>
    </div>
  )
}

export default UserLogin