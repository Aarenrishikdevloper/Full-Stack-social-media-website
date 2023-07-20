import { useContext, useEffect, useState } from "react"; 
import { AuthContext } from "../../context/usercontext";
import axios from "axios"; 
import PropTypes from "prop-types"; 
export default function Comment({postid}) {
  const {currentUser} = useContext(AuthContext);  
  const[comment, setcomment] = useState("");   
  const[info, setinfo] = useState([]);
  useEffect(()=>{
     axios.get('http://localhost:3000/comment',{withCredentials:true}).then(res=>{ 
       setinfo(res.data); 
       console.log(res.data);
       
     })
  },[])
  async function post(){
     
     try{
       const res =  await axios.post("http://localhost:3000/comment",{comment, postid}, {withCredentials:true}); 
       if(res.status === 200){ 
        alert("Comment Sucessfully");
       }
        window.location.reload(true);
     }catch{
       alert("something went wrong");
     }
  }
  return (
    <div style={{padding:"10px"}}> 
        <div className="inputcomment">
        <img src={currentUser.profilepic} className='profilepost'/>  
         <input type="text" placeholder="Write Your thoughts" value={comment} onChange={(e)=>setcomment(e.target.value)} /> 
          <button className="addbutton" onClick={post}>Post</button>
        </div> 
      
         {info.map((comment)=>{
          
            if(info.length > 0 && postid === comment.post){
              return(
                <div className="comment" key={comment._id}> 
                  <img src={comment.user.profilepic} className='profilepost'/>  
                   <div className="commentinfo">
                       <span style={{marginLeft:'6px', fontSize:18,  marginTop:6, textAlign:'start'}}>{comment.user.username} </span> 
                       <p className="text_3">{comment.comment}</p> 

                   </div>
                  
                </div>
               
              
                
              )
            }
         })}
         

      


    </div> 
    
  )
} 
Comment.propTypes = {
  postid: PropTypes.string.isRequired,
};

