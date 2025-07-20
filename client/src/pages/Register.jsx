import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const [inputs,setInputs]=useState({
    username:"",
    email:"", 
    password:"" 
  })

const [err,setError]=useState(null);

const navigate=useNavigate();
const handlechange=e=>{
     setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
}
const handlesubmit = async e=>{
  e.preventDefault()
  try{
 await axios.post("http://localhost:8800/api/auth/register",inputs,{
  withCredentials:true,
 })
  navigate("/login")
  }catch(err)
  {setError(err.response.data)
  }
}
  return (
    <div className="auth">
        <h1> Register</h1>
        <form>
      <input required type="text" placeholder='username'name='username' onChange={handlechange}   />
       <input required type="email" placeholder='email' name='email' onChange={handlechange}   />
       <input required type="password" placeholder='password'name='password' onChange={handlechange}   />
       <button onClick={handlesubmit}> Register</button>
       {err && <p> {err}</p>}
       <span> Do you have an account? <Link to="/login">Login</Link></span>
        </form>
    </div>
  );
};

export default Register;
