import './profileleftbar.css';
import {  useParams } from 'react-router-dom'; 
import { useState } from 'react'; 
import { useEffect , useContext } from 'react'; 
import axios from 'axios'; 
import { AuthContext} from "../../context/usercontext";
import Followercontainer from './Followercontainer';
function Profileleftbar() { 
    const[data, setdata] = useState([]); 
    const {currentUser} = useContext(AuthContext);
    const [status, setStatus] = useState('Follow');

    const{id} = useParams();
    useEffect(()=>{
        axios.get("http://localhost:3000/profile/"+id, {withCredentials:true}).then(response=>{
           setdata(response.data);  
           setStatus(response.data.followings.includes(currentUser._id)?"Unfollow":"Follow");
           
        })
    } ,[])  
    console.log(data._id);  
  
    
    async function follow(){
      try{
       if(status=="Follow"){
        const res = await axios.put('http://localhost:3000/following/'+id, {userid:currentUser._id});   
        if(res.status === 200){
          window.location.reload(true); 
          
       } 
       } 
       else{
        const res = await axios.put('http://localhost:3000/following/'+id, {userid:currentUser._id});   
        if(res.status === 200){
          window.location.reload(true); 
          
       }  
       }
       
      }catch{
        alert("Something went wrong");
      }
   }
  return (
    <div className="profileleftbar">
       <div className="infocontainer">
           <img src={data.coverpicture} className='cover' /> 
           <div className="userinfo">
              <img src={data.profilepic} className='profileimage' />  
              <div>
                  <p className='user'>{data.username}</p>
                   
              </div>
           </div>
           <div className="useritem">
               <p className='item1'>Followers</p> 
                <p className='item2'>{data.followers?.length}</p>
           </div> 
           <div className="useritem">
               <p className='item1'>Followings</p> 
                <p className='item2'>{data.followings?.length}</p>
           </div>
           <div style={{marginTop:-20}}>
               <h5 className='heading'>User bio</h5> 
               <p className='bio'>Hello Welcome to my world</p>
           </div>
           <div>
           </div>
             {currentUser._id === id ?<button className='editbutton'  style={{cursor:'pointer'}}>Edit Profile</button>:<button className='editbutton' style={{cursor:'pointer'}} onClick={follow} >{status}</button>} 
       </div> 
       <div className="notification"> 
      
         <h3>Followers</h3>   
          <div className='head'>
              <p style={{marginLeft:10}}>Friends</p> 
              <p style={{marginRight:10, color:"#aaa"}}>See all</p>
          </div> 
          <Followercontainer id={id}/>

   </div>
    </div>
  )
}

export default Profileleftbar