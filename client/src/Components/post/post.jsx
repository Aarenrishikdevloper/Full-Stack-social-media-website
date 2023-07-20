import './post.css'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'; 
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'; 
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'; 
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'; 
import Comment from './comment'; 
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types"; 
import axios from 'axios';
import { AuthContext } from '../../context/usercontext'; 
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
export default function Post({post}) { 
    const[comment, setcomment] = useState(false); 
    const[liked, setliked] = useState(false); 
    const{currentUser} = useContext(AuthContext); 
    const[likes, setlike] = useState(post.likes.length);  
    const[menu, setmenu] = useState(false);
    useEffect(()=>{
      setliked(post.likes.includes(currentUser._id));
    },[currentUser._id, post.likes]) 
    async function like(){
       try{
        await axios.put("http://localhost:3000/likes",{userid:currentUser._id, postid: post._id});  
        
        
       }catch(err){
          console.log(err);
       }  
       setlike(liked? likes-1: likes+1); 
       setliked(!liked);
    } 
    const handlemenu=()=>{
      if(currentUser._id === post.user._id){
        setmenu(!menu);
      }else{
         return null;
      }
    }
    async  function delepost(){
      try{
       const res = await axios.delete('http://localhost:3000/deletepost/'+post._id);  
        if(res.status ===200){
          alert("Post deleted Sucessfully"); 
          window.location.reload(true);
        }
       

      }catch{
         alert("something went wrong");
      }
      
    }
    
  return (
    <div className='postcontainer'>
        <div className='subcontainer'>
            <div>
               
                <div className='details'>
                 <Link to={"/profile/"+post.user._id}>
                    <img src={post.user.profilepic} className='profilepost'/> 
                  </Link>
                    <div>
                        <Link to={"/profile/"+post.user._id} style={{textDecoration:'none', color:'black'}}>
                        <p className='name'>{post.user.username}</p>
                        </Link>
                        <p  className='text_2'>Just now </p>
                    </div> 
                    
                    <MoreHorizOutlinedIcon className='moreicon' onClick={handlemenu}/>
                    {menu && currentUser._id === post.user._id && (
                           <div style={{display:'flex', flexDirection:'column'}}>
                            <button className='deletebotton' onClick={delepost}>Delete</button> 
                            </div> 
                           
                      
                      
                    )}
                       
                   
                </div>
              
              <p className='title'>{post.desc}</p> 
              {post.type === "Image"?<img className='postimages' src={post.content} />:<video  controls className='postimages'><source src={post.content} type="video/mp4"/></video>}
                
            </div>
            <div style={{display:"flex"}}>
                <div className='info'>
                    <div className='icon' onClick={like}>
                       {liked?<FavoriteOutlinedIcon style={{color:'red', width:"20px"}}/> :<FavoriteBorderOutlinedIcon style={{width:"20px"}}/>}
                        <p>{likes} people</p>
                    </div> 
                    <div className='icon' onClick={()=>setcomment(!comment)}>
                        <ChatBubbleOutlineOutlinedIcon style={{width:"20px"}}/>
                         <p> Comments</p>
                    </div> 
                    <div className='icon'>
                        <ShareOutlinedIcon   style={{width:"20px"}}/>
                         Share
                    </div>

                </div>
               
            </div> 
            {comment && <Comment postid={post._id}/>}
        </div>
    </div>
  ) 

} 
Post.propTypes = {
    post: PropTypes.object.isRequired,
  };
