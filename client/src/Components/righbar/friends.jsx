import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import './friends.css'
import PropTypes from "prop-types"; 
import axios from 'axios';  
import { useContext } from 'react';
import { AuthContext} from '../../context/usercontext';
export default function Friends({friends}) { 
  const { currentUser} = useContext(AuthContext);
  async function follow(){
     try{
      const res = await axios.put('http://localhost:3000/following/'+friends._id, {userid:currentUser._id});  
      if(res.status === 200){
         window.location.reload(true);
      }
     }catch{
       alert("Something went wrong");
     }
  }
  return (
    <div style={{margin:-10, marginBottom:"10px"}}>
        <div className="container">
            <div className="profilecontainer">
                <img src={friends.profilepic} className="profilepic"/> 
                <div>
                    <p className="text1">{friends.username}</p> 
                    <p className="text2">Suggested for you</p>
                </div>  
               
            </div> 
            <div className="button" onClick={follow} >
                   <GroupAddOutlinedIcon />
                </div>
        </div>
    </div>
  )
}  
Friends.propTypes = {
  friends: PropTypes.object.isRequired,
};

