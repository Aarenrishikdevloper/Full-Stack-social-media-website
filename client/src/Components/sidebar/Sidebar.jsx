import { useEffect, useState } from "react"
import "./Sidebar.css"
import axios from "axios";

function Sidebar() { 
    const[item, setitem ] = useState([]); 
    useEffect(()=>{
        try{
           axios.get("http://localhost:3000/post",{withCredentials:"true"}).then(res=>{
              setitem(res.data); 
              
           })
        }  
        catch{
            console.log("Something went Wrong");
        }
    })
  return (
    <div className="sidebar"> 
      <div className="notification">
         <div className="headertcontainer"> 
            <p style={{marginLeft:'-14px'}}>Notification</p> 
            <p style={{color:'#aaa', marginLeft:'40px'}}>See All</p>
         </div>  
         <div className="contentcontainer"> 
             <img src="https://source.unsplash.com/random/400x400/?man" className="profilepic" />  
             <p style={{fontSize:13}}>Safak Liked your post</p> 
             <img src="https://source.unsplash.com/random/400x400/?mountain" className="likedpost" />       
               


         </div>   
         <div className="contentcontainer"> 
             <img src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1600" className="profilepic" />  
             <p style={{fontSize:13}}>Safak Started following you</p> 
             <img src="https://source.unsplash.com/random/400x400/?man" className="followerphoto" />        
               


         </div>   
         <div className="contentcontainer"> 
             <img src="https://source.unsplash.com/random/400x400/?man" className="profilepic" />  
             <p style={{fontSize:13}}>Safak Liked your post</p> 
             <img src="https://source.unsplash.com/random/400x400/?mountain" className="likedpost" />       
               


         </div>   
         <div className="contentcontainer"> 
             <img src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1600" className="profilepic" />  
             <p style={{fontSize:13}}>Safak Started following you</p> 
             <img src="https://source.unsplash.com/random/400x400/?man" className="followerphoto" />        
               


         </div>  
         <div className="contentcontainer"> 
             <img src="https://source.unsplash.com/random/400x400/?man" className="profilepic" />  
             <p style={{fontSize:13}}>Safak Liked your post</p> 
             <img src="https://source.unsplash.com/random/400x400/?mountain" className="likedpost" />       
               


         </div>    
         <div className="contentcontainer"> 
             <img src="https://source.unsplash.com/random/400x400/?man" className="profilepic" />  
             <p style={{fontSize:13}}>Safak Liked your post</p> 
             <img src="https://source.unsplash.com/random/400x400/?mountain" className="likedpost" />       
               


         </div>   
         <div className="contentcontainer"> 
             <img src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1600" className="profilepic" />  
             <p style={{fontSize:13}}>Safak Started following you</p> 
             <img src="https://source.unsplash.com/random/400x400/?man" className="followerphoto" />        
               


         </div>  
         <div className="contentcontainer"> 
             <img src="https://source.unsplash.com/random/400x400/?man" className="profilepic" />  
             <p style={{fontSize:13}}>Safak Liked your post</p> 
             <img src="https://source.unsplash.com/random/400x400/?mountain" className="likedpost" />       
               


         </div>   
         <div className="contentcontainer"> 
             <img src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1600" className="profilepic" />  
             <p style={{fontSize:13}}>Safak Started following you</p> 
             <img src="https://source.unsplash.com/random/400x400/?man" className="followerphoto" />        
               


         </div>  
         
          
        
      </div>
      <div className="notification"> 
      
         <div className="headertcontainer"> 
            <p style={{marginLeft:'-14px'}}>Explore</p> 
            <p style={{color:'#aaa', marginLeft:'40px'}}>See All</p>
         </div>   
           <div>
            {item.map((items)=>{
               if(items.type ==="Image"){
                 return(
                    <img className='exploreimage' src={items.content} key={items._id}/>
                 )
               }else{
                 return null;
               }
            })}
                      
        </div> 

      </div>

       
    </div> 
    
  )
}

export default Sidebar