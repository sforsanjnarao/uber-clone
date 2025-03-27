import React, { createContext, useState } from 'react'

export const UserDataContext=createContext() //this is the context provider

function UserContext({children}) {
    const [user, setUser]=useState({
        email: '',
        fullName:{
            firstname: '',
            lastname: ''
        } // why we are passing just the fullname and email
    })
  return (
        <UserDataContext.Provider value={({user ,setUser})}>
            {children}
        </UserDataContext.Provider>
     
  )
}

export default UserContext