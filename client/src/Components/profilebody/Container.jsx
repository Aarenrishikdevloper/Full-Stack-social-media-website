import { useEffect, useState } from "react";

import axios from "axios";
import Post from "../post/post";

import PropTypes from 'prop-types';


export default function Container({id}) { 
 
  const user = id.toString();
  const[info, setinfo] =useState([])
  useEffect(()=>{ 
    try{
       axios.get("http://localhost:3000/post",{withCredentials:true}).then(res=>{
          setinfo(res.data); 
          console.log(res);
       })
      } 
      catch{
         console.log("Something went wrong");
      }
       

  },[])
    
  return (
    <div>
       {info.map((post)=>{
         if(user === post.user._id.toString()){
          return(
            <Post post={post} key={post._id}/>  
          )
         }else{
           return null;
         }
       })}
    </div>
  )
}
Container.propTypes = {
  id: PropTypes.string.isRequired,
};