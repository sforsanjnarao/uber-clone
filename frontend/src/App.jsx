import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup';



function App() {
  return (
    <div>
       <Routes>
         <Route path='/' element={<Home/>}/> 
         <Route path='/user/login' element={<UserLogin/>}/> 
         <Route path='/captain/Login' element={<CaptainLogin/>}/>
         <Route path='/user/register' element={<UserSignup/>}/>
         <Route path='/captain/register' element={<CaptainSignup/>}/>
       </Routes>

       
    </div>
  )
}

export default App
