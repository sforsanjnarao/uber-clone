import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function captainSignup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const navigate = useNavigate()
  // handle form submission event here with the email and password values
  // and handle any server-side validation or error messages appropriately.
  // For example, you could use the fetch API to send a POST request to the server's '/login' endpoint.
  // Once the server responds with a valid token, you could set the token in a cookie or local storage,
  // and redirect the user to the home page.

  const handleSubmit = (e) => {
    e.preventDefault()
    setCaptainData({
      fullname:{
        firstname:firstname,
        lastname:lastname
      },
      email:email,
      password:password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        type: vehicleType
      }
    })
    console.log(email, password)
    setEmail("")
    setPassword("")
    setFirstname("")
    setLastname("")
    setVehicleColor("")
    setVehiclePlate("")
    setVehicleCapacity("")
    setVehicleType("")

    // send the form data to the server
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <h3>Enter your fullname</h3>
          <input type="text" 
          placeholder='enter firstname'
          required
          value={firstname}
          onChange={(e)=>setFirstname(e.target.value)}/>
          <input type="text" 
          placeholder='enter lastname'
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
          <div>
            <h3>Enter your vehicle details</h3>
            <input type="text" 
            placeholder='enter vehicle color'
            required
            value={vehicleColor}
            onChange={(e)=>setVehicleColor(e.target.value)}/>

            <input type="text" 
            placeholder='enter vehicle plate'
            required
            value={vehiclePlate}
            onChange={(e)=>setVehiclePlate(e.target.value)}/>

            <input type="number" 
            placeholder='enter vehicle capacity'
            required
            value={vehicleCapacity}
            onChange={(e)=>setVehicleCapacity(e.target.value)}/>

            <select value={vehicleType} onChange={(e)=>setVehicleType(e.target.value)}>
              <option value="">Select vehicle type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="bus">Bus</option>
            </select>
          </div>
          <button type='submit'>Register</button>  
          <p>Already have a account? <Link to="/captain/login">Create Captain</Link></p> 
      </form>
      <button type='submit' onClick={()=>navigate('/user/login')}>Sign in as User</button>
    </div>
  )
}


export default captainSignup