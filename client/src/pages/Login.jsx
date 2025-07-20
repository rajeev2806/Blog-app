
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authcontext';

const Login = () => {
  const [inputs,setInputs]=useState({
    username:"",
    email:"", 
    password:"" 
  })

const [err,setError]=useState(null);

const navigate=useNavigate();

const {login}=useContext(AuthContext);




const handlechange=e=>{
     setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
}
const handlesubmit = async e=>{
  e.preventDefault()
  try{
   await  login(inputs)
 await axios.post("http://localhost:8800/api/auth/login",inputs,{
  withCredentials:true,
 })
  navigate("/")
  }catch(err)
  {setError(err.response.data)
  }
}
  return (
    <div className="auth">
        <h1> Login</h1>
        <form>
      <input required type="text" placeholder='username' name='username' onChange={handlechange}/>
      <input required type="password" placeholder='password' name='password' onChange={handlechange}/>
       <button onClick={handlesubmit}> Login</button>
       {err && <p>{err}</p>}
       <span> Don't have an account? <Link to="/register">Register</Link></span>
        </form>
    </div>
  );
};

export default Login;
