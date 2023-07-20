import "./profilerightbar.css"
import Friends from "../righbar/friends" 
import axios from 'axios'
import { AuthContext } from '../../context/usercontext'
import { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"


function Profilerightbar() { 
  const[use, setuser] = useState([]);  
  const { currentUser} = useContext(AuthContext);
   useEffect(()=>{
     axios.get('http://localhost:3000/userall',).then(res=>{
       setuser(res.data); 
       console.log(setuser);
     }) 
   },[]) 
   const[friend, setfriend] = useState([]);  
    const{id} =useParams();
   useEffect(()=>{
       axios.get('http://localhost:3000/followings/'+id, {withCredentials:true}).then(res=>{
         setfriend(res.data); 
         console.log(friend)
       })

       
   },[id])
  return (
    <div className="profilerightbar"> 
       <div className="container45">
            <h3 className="heading1">Followings</h3>  
            <div style={{marginTop:'10px'}}>
            
           {friend.map((friend)=>(
              <div className="info_3" key={friend._id}>
              <img src={friend.profilepic} className="friendsimage" /> 
              <p className="text5">{friend.username}</p> 

          </div>  
           ))}
         </div>    

          
          
         </div> 
         <div className="container46">
         <h3 className='heading1'>Suggested for you</h3>   
         {use.map((res)=>{
               if(currentUser._id !== res._id && !res.followers.includes(currentUser._id)){
               return ( <Friends friends={res} key={res._id}/>)
               }
         })}
          
        </div>
            
       </div> 
       

    
  )
}

export default Profilerightbar