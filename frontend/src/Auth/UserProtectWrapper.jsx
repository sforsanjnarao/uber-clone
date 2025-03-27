import React, {useContext, useEffect, useState} from 'react'
import { UserDataContext } from '../context/UserContext' 
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserProtectWrapper({children}) {
    const token=localStorage.getItem('token')
    const navigate = useNavigate()
    const {user,setUser} = useContext(UserDataContext)
    const [isLoading,setIsLoading]=useState(true)


    useEffect(()=>{
        if(!token){
            navigate('/user/login')
        }

        axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(response=>{
            if(response.status===200){
                setUser(response.data)
                setIsLoading(false)
            }
        }).catch(err=>{
            localStorage.removeItem('token')
            navigate('/user/login')
        })
    },[token])

    if(isLoading){
        return(
            <div>Loading...</div>
        )
    }

  return (
    <>{children}</>
  )
}

export default UserProtectWrapper