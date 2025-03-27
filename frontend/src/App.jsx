import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup';
import Start from './pages/Start';
import UserLogout from './pages/UserLogout';
import UserProtectWrapper from './Auth/UserProtectWrapper';
import CaptainProtectWrapper from './Auth/CaptainProtectWrapper';
import CaptainHome from './pages/CaptainHome';



function App() {
  return (
    <div>
       <Routes>
         <Route path='/' element={<Start/>}/>
         <Route path='/home' element={
          <UserProtectWrapper>
            <Home />   
          </UserProtectWrapper>
          }/> 
         <Route path='/user/login' element={<UserLogin/>}/> 
         <Route path='/captain/Login' element={<CaptainLogin/>}/>
         <Route path='/user/register' element={<UserSignup/>}/>
         <Route path='/captain/register' element={<CaptainSignup/>}/>
         <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />  
          </UserProtectWrapper>
          }/>
          <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />  
          </CaptainProtectWrapper>
          }/>
         
       </Routes>

       
    </div>
  )
}

export default App
