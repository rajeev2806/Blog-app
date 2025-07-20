import { db } from "../db.js";
import jwt from "jsonwebtoken"

export const getPosts=(req,res)=>{
    
    const q=req.query.cat
    ? "SELECT * FROM blog.posts WHERE cat=$1"
    :"SELECT * FROM blog.posts";
 
    const values=req.query.cat? [req.query.cat]:[];
    db.query(q,values,(err,data)=>{
        if(err) return res.status(500).send(err)

          return res.status(200).json(data.rows)

    })
};


export const getPost=(req,res)=>{
    const q="SELECT bp.id,bu.username,bp.title,bp.descp,bp.img,bu.img as userimg,bp.cat,bp.date FROM blog.users as bu JOIN blog.posts as bp ON bu.id=bp.uid WHERE bp.id=$1 "
    
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err)
        
        return res.status(200).json(data.rows[0]);
    })


}


export const addPost=(req,res)=>{
   const token=req.cookies.access_token
    if(!token) return res.status(401).json("not authenticated")

  jwt.verify(token,"jwtkey",(err,userinfo)=>{
    if(err) {
        console.log("🔒 Token verification failed:", err);
        return  res.status(403).json(" token is not valid")
    }
    const q=
    "INSERT INTO blog.posts(title, descp, img, date, cat, uid) VALUES ($1, $2, $3, $4, $5, $6)";
    
    const values=[
        req.body.title,
        req.body.descp,
        req.body.img,
        req.body.date,
        req.body.cat,
        userinfo.id
]
console.log(" Attempting insert with values:", values);

  db.query(q,values,(err,data)=>{
       if(err){
        console.log("db error",err)
         return res.status(500).json("database error")}
        return res.json("Post has been created")
  })
   

});
}


export const deletePost=(req,res)=>{
    const token=req.cookies.access_token
    if(!token) return res.status(401).json("not authenticated")

  jwt.verify(token,"jwtkey",(err,userinfo)=>{
    if(err) res.status(403).json(" token is not valid")
    
   const postId=req.params.id
   const q= "DELETE FROM blog.posts WHERE id=$1 AND uid=$2"

   db.query(q,[postId,userinfo.id],(err,data)=>{
        if(err) return res.status(403).json("you can delete only your post!");
        
        return res.json("post has been deleted");
   })
  })
    }

export const updatePost=(req,res)=>{
    const token=req.cookies.access_token
    if(!token) return res.status(401).json("not authenticated")

  jwt.verify(token,"jwtkey",(err,userinfo)=>{
    if(err) return res.status(403).json(" token is not valid")

const postId=req.params.id

    const q=
   "UPDATE blog.posts SET  title=$1,descp=$2,  img=$3,  cat=$4 WHERE id=$5 AND uid=$6 ";
    
    const values=[
        req.body.title,
        req.body.descp,
        req.body.img,
        req.body.cat,
        postId,
        userinfo.id

]

  db.query(q,values,(err,data)=>{
       if(err) return res.status(500).json("post error")
        return res.json("Post has been updated")
  })
   

});
}
