import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function userSignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState('')
  const[firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const navigate = useNavigate()
  // handle form submission event here with the email and password values
  // and handle any server-side validation or error messages appropriately.
  // For example, you could use the fetch API to send a POST request to the server's '/login' endpoint.
  // Once the server responds with a valid token, you could set the token in a cookie or local storage,
  // and redirect the user to the home page.

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserData({
      fullname:{
        firstname:firstname,
        lastname:lastname
      },
      email:email,
      password:password
    })
    console.log(email, password,firstname,lastname)
    setEmail("")
    setPassword("")
    setFirstname("")
    setLastname("")

    // send the form data to the server
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div> 
          <h3>enter fullname</h3>
          <input type="text" 
          placeholder='enter'
          required
          value={firstname}
          onChange={(e)=>setFirstname(e.target.value)}
          />
          <input type="text" 
          placeholder='enter'
          required
          value={lastname}
          onChange={(e)=>setLastname(e.target.value)}/>
        </div>

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
          <button type='submit'>Register</button>  
          <p>Alredy have an account? <Link to="/user/login">Login</Link></p> 
      </form>
      <button type='submit' onClick={()=>navigate('/captain/login')}>Sign in as Captain</button>
    </div>
  )
}

export default userSignUp