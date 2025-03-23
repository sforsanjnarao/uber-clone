import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function CaptainLogin()  {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState('')
  const navigate = useNavigate()
  // handle form submission event here with the email and password values
  // and handle any server-side validation or error messages appropriately.
  // For example, you could use the fetch API to send a POST request to the server's '/login' endpoint.
  // Once the server responds with a valid token, you could set the token in a cookie or local storage,
  // and redirect the user to the home page.

  const handleSubmit = (e) => {
    e.preventDefault()
    setCaptainData(email, password)
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