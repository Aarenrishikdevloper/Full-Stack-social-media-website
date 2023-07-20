import { useEffect, useState } from "react"


import axios from "axios";
import { useParams } from "react-router-dom";
export default function Followercontainer() {   
  const{id} = useParams();
  console.log(id);
    const[friend, setfriend] = useState([]);  
    
   useEffect(()=>{
       axios.get('http://localhost:3000/follower/'+id, {withCredentials:true}).then(res=>{
         setfriend(res.data); 
         console.log(friend)
       })

       
   },[friend, id])
  return (
    <div className="friend">
    {friend.map((friends)=>(
        <div className='list' key={friends._id}>
        <img src={friends.profilepic} className='friendimage'/> 
        <p style={{marginLeft:-2}}>{friends.username}</p>
    </div> 
    ))}
    
    
</div>
  )
}
