import React, {useContext} from 'react'
import { UserDataContext } from '../context/UserContext' 
import { useNavigate } from 'react-router-dom'


function UserProtectWrapper({children}) {
    const token=localStorage.getItem('token')
    const navigate = useNavigate()

    if(!token){
        navigate('/user/login')
    }


  return (
    <>{children}</>
  )
}

export default UserProtectWrapper