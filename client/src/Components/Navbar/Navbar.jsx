import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'; 
import NotificationsIcon from '@mui/icons-material/Notifications'; 
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import './Navbar.css'; 
import { useContext, useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'; 
import { AuthContext } from '../../context/usercontext'; 
import { Navigate } from 'react-router-dom';

export default function Navbar() {  
   const[redirect, setredirect] = useState(false); 
   const{currentUser, setCurrentUser} = useContext(AuthContext);
   async function logout(){
      try{
        await axios.post("http://localhost:3000/logout" ,{},{withCredentials:true});  
        setredirect(true); 
        setCurrentUser(null); 
        localStorage.clear();


      }  
      catch{
        alert("Something went wrong");
      }
   } 
   if(redirect){
      return <Navigate to="/login"/>
   } 
   console.log(currentUser._id)
  return (
    <div className="mainnavbar">
       <div className="logocontainer">
       <p style={{marginLeft:"5px"}}>Conn<span className="part">ectify</span></p>
       </div> 
       <div>
         <div className="searchcontainer">
            <SearchOutlinedIcon style={{width:'20px', height:'20px'}}/> 
            <input type='text' className='serach ' placeholder='Search for Friends'/>
          </div> 
       </div>
       <div className="iconcontainer"> 
       <NotificationsIcon style={{width:'20px', height:'20px', marginLeft:'20px'}}/>
          
       
       <ChatBubbleIcon style={{width:'20px', height:'20px', marginLeft:'20px'}}/>
       <Link to={`/Profile/${currentUser._id}`} style={{textDecoration:"none", color:'black'}}>
       <div className="profilecontainer">
          <img src= {currentUser.profilepic} alt="/" className='imgprofile'/>  
          <p style={{marginLeft:'5px'}}>{currentUser.username.split(' ')[0]}</p>  
          
       </div>  
       </Link>
      

       
       <div className="logout"onClick={logout}>
          Logout
       </div>
       </div>
    </div>
  )
}
