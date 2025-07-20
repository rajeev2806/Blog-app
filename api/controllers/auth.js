import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register=(req,res)=>{

    //check existing user
    const q='SELECT * FROM blog.users WHERE email=$1 OR username=$2 ';
    
    db.query(q,[req.body.email,req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if(data.rows.length) return res.status(409).json("User already exists") // data rows instead of array val 
         
            // hash the password
            const salt = bcrypt.genSaltSync(10); 
            const hash = bcrypt.hashSync(req.body.password, salt);
          
    const q="INSERT INTO  blog.users(username,email,password) VALUES($1, $2, $3)"
    const values=[
        req.body.username,
        req.body.email,
       hash
    ]
   db.query(q,values,(err,data)=>{
    if(err) return res.json(err)
     
   return res.status(200).json("User has been created.")    

   })
})
}

export const login=(req,res)=>{
   
//check existing user
    const q='SELECT * FROM blog.users WHERE username=$1 ';
     
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if(data.rows.length==0) return  res.status(404).json('User not found!')
      
    //check password
    const ispasswordcorrect=bcrypt.compareSync(req.body.password,data.rows[0].password);
    
    if(!ispasswordcorrect)  return res.status(400).json("wrong username or password")
    
    const token=jwt.sign({id:data.rows[0].id},"jwtkey")
    const {password,...other}=data.rows[0];

    res.cookie('access_token',token,{
        httpOnly:true,
        secure: false,         
        sameSite: "lax",   
    }).status(200).json(other)

        })
   


};

export const logout=(req,res)=>{


    res.clearCookie("access_token",{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    }).status(200).json('User has been logged out')
};
