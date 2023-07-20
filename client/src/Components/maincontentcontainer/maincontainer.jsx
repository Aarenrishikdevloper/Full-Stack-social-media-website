import { useEffect, useState } from 'react'
import Post from '../post/post'
import './container.css'
import axios from 'axios'

export default function Maincontainer() {  
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
    <div className='conatiner'>
      {info.map((post)=>(
         <Post post={post} key={post._id}/>
      ))}
    </div>
  )
}
