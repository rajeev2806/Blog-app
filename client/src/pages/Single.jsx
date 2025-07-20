import React from 'react';
import Edit from '../img/edit.png'
import Delete from '../img/delete.png';
import {Link, useNavigate} from 'react-router-dom';
import Menu from '../components/Menu'
import moment from "moment"
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from '../context/authcontext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Single = () => {
    
    const [post,setPost]=useState({})

  const location=useLocation()

  const postId=location.pathname.split("/")[2]

  const {currentuser}=useContext(AuthContext)

  const navigate=useNavigate()
  // console.log(location)

  useEffect(()=>{
    const fetchdata=async()=>{
      try{
    const res=await axios.get(`http://localhost:8800/api/posts/${postId}`,{
        withCredentials: true,
    })
   console.log(res.data)
    setPost(res.data)
      }
      catch(err){
    console.log(err)
      }
    }
    fetchdata()
  },[postId])

const handledelete=async()=>{
try{
    const res=await axios.delete(`http://localhost:8800/api/posts/${postId}`, {
      withCredentials: true,
     })
  // console.log(res.data)
 
    navigate("/")
      }
      catch(err){
    console.log(err)
      }
}
//console.log("Current:", currentuser?.username, "Post author:", post?.username);
 const getText=(html)=>{
    const doc=new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
    
  }
  return (
  <div className="single">
    <div className="content">
      <img src={`../upload/${post?.img}`}  alt=""
/>
<div className="user">
 { post.userimg && <img src={post.userimg} alt=""
 />}

<div className="info">
  <span>{post.username}</span>
 <p>Posted {moment(post.date).fromNow()} </p>
</div>
{currentuser?.username?.toLowerCase()=== post?.username?.toLowerCase() && ( 
  <div className="edit">
  <Link to={`/write?edit=${post.id}`} state={post}>
  <img src={Edit} alt="Edit"/>
  </Link>
<img onClick={handledelete} src={Delete} alt="Delete"/>
</div>
  )}


    </div>
    <h1>{post.title}</h1>
     {getText(post.descp)} 
    </div>
   <Menu cat={post.cat}/>
  </div>
  );
}

export default Single;

