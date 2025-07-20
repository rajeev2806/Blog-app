import { useState } from "react"
import { createContext } from "react"
import axios from "axios"
import { useEffect } from "react"

export const AuthContext= createContext()

export const AuthContextProvider=({children})=>{
    const [currentuser,setcurrentuser]=useState(JSON.parse(localStorage.getItem("user"))|| null);

    const login=async(inputs)=>{
        const res=await axios.post("http://localhost:8800/api/auth/login",inputs);
        setcurrentuser(res.data)
    }
    const logout=async(inputs)=>{
        const res=await axios.post("http://localhost:8800/api/auth/logout",{},{
            withCredentials:true
        });
        setcurrentuser(null);
        localStorage.removeItem("user")
    }


    useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(currentuser))
    },[currentuser])
   
    return(
        <AuthContext.Provider value={{currentuser, login, logout}}>
            {children}
            </AuthContext.Provider>
    )

}