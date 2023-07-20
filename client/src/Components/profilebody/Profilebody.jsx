import axios from 'axios';

import Upload from "../upload/Upload"
import "./profilebody.css"  
import { useParams } from 'react-router-dom'; 
import { useContext, useState } from 'react'; 
import { useEffect } from 'react';
import { AuthContext } from '../../context/usercontext';
import Container from './Container';


export default function Profilebody() {  
  const[data, setdata] = useState([]);
  const{ currentUser} = useContext(AuthContext);
  const{id} = useParams();
  useEffect(()=>{
    axios.get("http://localhost:3000/profile/"+id, {withCredentials:true}).then(response=>{
      setdata(response.data);
    })
      
  } ,[]) 
  
  return (
    <div className="profilebody"> 
    <div>
         <img src={data.coverpicture} className="coverimg"/> 
         {data._id === currentUser._id &&(
           <h2>Your Profile</h2>  
    
          )} 
           {data._id !== currentUser._id &&(
           <h2>{data.username} Profile</h2>  
    
          )}
         
    </div>
    {data._id === currentUser._id &&(
        <Upload/>   
    
    )}
     
      <Container id={id}/>
      
    
    </div>
  )
}

