import './uploads.css'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebaseconfig"; 
import { AuthContext } from '../../context/usercontext'; 
import { useContext, useState } from 'react';
import axios from 'axios';
export default function Upload() {  
  const storage = getStorage(app);  
  const[desc, setdesc] =useState(''); 
  
  const{currentUser} = useContext(AuthContext); 
  const [file1, setfile] =useState(null); 
  
  const[progress2, setprogress] = useState(0);
  const hadlechange =(e)=>{
    setfile(e.target.files[0]);
  }  
  

  async function post(){
     if(!file1){
       return; 
     } 
     try{
     //updating photos to firebase storage
     if(file1){
      
       const storageref =ref(storage, "posts/" + file1.name); 
       const uploadtask = uploadBytesResumable(storageref,file1); 
       uploadtask.on(
         "state_changed", 
         (snapshot)=>{
           const progress = (snapshot.bytesTransferred/snapshot.totalBytes);  
           setprogress(progress); 
           console.log(progress2);

         },(error)=>{
           console.log(error);
         },()=>{
            //getting download url  
            //and sending requset to api for create new post
            getDownloadURL(uploadtask.snapshot.ref).then((url)=>{
              const filetype = file1.name.endsWith('.mp4')?"Video":'Image';
              axios.post('http://localhost:3000/newpost',{desc, content: url,type:filetype }, {withCredentials:true}).then((res)=>{
                console.log(res.data);   
                alert("Post created Sucessfully"); 
                window.location.reload(true);

              }).catch((error)=>{
                console.log(error);
              })
            })
         }  
         

       ) 
       
       
        

     
     
    }  
    
    
     
   }catch{
     alert("Something went wrong")
   }
   
   
  }
  return (
    <div>
      <div className='uploadcontainer'>
        
          <div className='details'>
            <img src={currentUser.profilepic} className='profileimg' /> 
            <input placeholder='Whats in your mind' className='messagecontainer' value={desc}  onChange={(e)=>setdesc(e.target.value)}/>
          </div>
          <hr className='custom-hr'/>

          <div className="sharecontainer">
            <div className="shareoption">
              <div className='iconcontainer'>  
                <label htmlFor='file' >
                <InsertPhotoOutlinedIcon className='icon' /> 
                 <input type='file' id="file" style={{display:'none'}} onChange={hadlechange} /> 
                 

                </label> 
                <span className='sharetext'> Photo</span>
               






              </div>
              <div className='iconcontainer'>
              <label htmlFor='file' >
                < VideoCameraBackOutlinedIcon className='icon' /> 
                 <input type='file' id="file" style={{display:'none'}}  onChange={hadlechange}/> 
                
                </label> 
                <span className='sharetext'>Video</span>
               







              </div>
              <div className='iconcontainer'>
                <EmojiEmotionsOutlinedIcon className='icon' />
                <span className='sharetext'>Feeling</span>







              </div> 
              

            </div>  
            <div>
               <button className='share' onClick={post}>Share</button>
              </div>
           
           




          </div>



        </div>
      </div>
    
  )
}
