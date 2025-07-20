import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Write = () => {

  const state=useLocation().state
  const [value,setValue]=useState(state?.title || "");
  const [title,setTitle]=useState(state?.descp || "");
  // const [descp,setDescp]=useState("");
  const [file,setFile]=useState(null);
  const [cat,setCat]=useState(state?.cat ||"");
  
  const navigate=useNavigate();

const upload = async()=>{
  try{
     const formData =new FormData();
     formData.append("file",file)
     const res= await axios.post("http://localhost:8800/api/upload",formData, {
  withCredentials: true, 
  headers: {
    "Content-Type": "multipart/form-data"
  }

})

    return res.data
    }
  catch(err){
console.log(err)
  }
}

const handlesubmit=async e=>{
    e.preventDefault()
   
   const imgUrl= await upload()

   try{
   state
   ? await axios.put(`http://localhost:8800/api/posts/${state.id}`,{
    title,
    descp:value,
    cat,
    img:file ? imgUrl:"",
   },{
  withCredentials: true,
})
: await axios.post(`http://localhost:8800/api/posts/`,{
    title,
    descp:value,
    cat,
    img:file ? imgUrl:"",
    date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
   },{
  withCredentials: true,
})
navigate("/")
   }catch(err)
   {
    console.log(err)
   }


}

  return (
    <div className="add">

      <div className="content">
        <input type="text" value={title}  placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
        <div className="editorcontainer">
           <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1> Publish</h1>
          <span>
            <b> Status: </b>Draft
          </span>
           <span>
            <b> Visibility: </b>Public
          </span>
         <input style={{display:"none"}} type="file" name=""  id="file" onChange={e=>setFile(e.target.files[0])} />
<label className='file' htmlFor="file">Upload Image</label>
<div className="button">
  <button>Save as draft</button>
  <button onClick={handlesubmit}> Publish</button>
</div>
        </div>
        <div className="item">
          <h1> Category</h1>
          <div className="cat">
          <input type="radio" checked={cat==="art"} name="category" value="art" id="art"  onChange={e=>setCat(e.target.value)}/>
        <label htmlFor='art'>Art</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat==="science"} name="category" value="science" id="science"   onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat==="technology"} name="category" value="technology" id="technology"   onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='technology'>Technology</label>
           
           </div>
           <div className="cat">
          <input type="radio" checked={cat==="cinema"} name="category" value="cinema" id="cinema"   onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='cinema'>Cinema</label>
          </div>
           <div className="cat">
          <input type="radio" checked={cat==="design"} name="category" value="design" id="design"   onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='design'>Design</label>
          </div>
           <div className="cat">
          <input type="radio" checked={cat==="food"} name="category" value="food" id="food"   onChange={e=>setCat(e.target.value)}/>
           <label htmlFor='food'>Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
