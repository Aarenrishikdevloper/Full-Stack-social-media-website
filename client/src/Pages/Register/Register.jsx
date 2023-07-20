import axios from "axios";
import { useState } from "react";
import "./register.css";    
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebaseconfig"; 
import {Link, Navigate} from 'react-router-dom';
const storage = getStorage(app);



export default function Register() {
   const[username, setusername] = useState(""); 
   const[email,setemail] = useState(""); 
   const[phonenumber,setno] = useState('');  
   const[file,setfile] = useState(null);
   const[password, setpassword] =useState('')  
   const[redirect, setredirect] = useState(false);
   const[progress, setprogess] = useState(""); 
   
   const handleclick=(e)=>{ 
      setfile(e.target.files[0]);
   }  
   const submit=async(e)=>{  
      e.preventDefault();

      try{
         if(!file){
            return;
         } 

         if(file){
            //uploading the photos to firebase; 
            const Storageref = ref(storage, "profile/" + file.name); 
            const uploadtask = uploadBytesResumable(Storageref, file); 
            uploadtask.on(
               "state_changed", 
               (snapshot)=>{
                  const progress = (snapshot.bytesTransferred/snapshot.totalBytes); 
                  setprogess(progress);
               },(error)=>{
                  console.log(error);
               }, 
               ()=>{
                  //getting the urr from firebase
                  getDownloadURL(uploadtask.snapshot.ref).then((url)=>{
                     
                      console.log(url);  
                      //sendinh request to api for new user using axios 
                      axios.post('http://localhost:3000/register',{username,email, profilepic:url, phonenumber, password}).then((res)=>{
                        console.log(res.data);
                      }).catch((error)=>{
                         console.log(error);
                      })
                  })
               }
            ) 
            
            setredirect(true);

         } 
        
      }
      catch{
         alert("Something went wrong");
      }
   }
   console.log(progress); 
   if(redirect){
      return  <Navigate to ="/login"/>
   }
  return (
    <div className="registercontainer"> 
       <div className="submaincontainer">
           <div style={{flex:1, marginLeft:150, marginBottom:"170px"}}>
              <p className="logotext">Conn<span className="part">ectify</span></p>
              <p className="intro">Connect with <span className="part">Family and friends</span></p>
           </div>
           <div style={{flex:3}}>
              <p className="createaccount">Create New account</p> 
              <input type="file" name="file" id="file"   onChange={handleclick}/> 
              <input type="text"  placeholder="username" className="input" value={username} onChange={(e)=> setusername(e.target.value)}/> 
              <input type="text" placeholder="Phone number" className="input" value={phonenumber}  onChange={(e)=> setno(e.target.value)}/> 
              <input type="email" placeholder="Email" className="input" value={email} onChange={(e)=>setemail(e.target.value)}/>  
              <input type="password" placeholder="Password" className="input" value={password} onChange={(e)=>setpassword(e.target.value)}/> 
              <button type="submit" className="btnsubmit" onClick={submit} >Signup</button> 
              <Link to="/login" style={{textDecoration:"none", color:"black"}}>
               <p className="text98">Atready have an account</p>
              </Link>
              


           </div>
       </div>

    </div>
  )
}
