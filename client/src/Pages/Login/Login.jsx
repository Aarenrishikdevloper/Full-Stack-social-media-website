import "./Login.css";
import { useContext } from 'react'; 
import { AuthContext } from "../../context/usercontext";


import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
export default function  Login() {
   const[email,setemail] = useState("");   
   const[password, setpassword] =useState('');  
   const[redirect, setredirect] = useState(false);
   const {login } = useContext(AuthContext); 
   
   async function signin(e){
         e.preventDefault();
         try{
          await login(email, password);
          setredirect(true); 
      }catch{
          alert("something went wrong Please try again");
      }
   } 
   if(redirect){
      return <Navigate to="/"/>;
   }
  return (
    <div className="registercontainer"> 
       <div className="submaincontainer">
           <div style={{flex:1, marginLeft:150, marginBottom:"170px"}}>
              <p className="logotext">Conn<span className="part">ectify</span></p>
              <p className="intro">Connect with <span className="part">Family and friends</span></p>
           </div>
           <div style={{flex:3}}>
              <p className="createaccount">Login Account</p> 
              
              <input type="email" placeholder="Email" className="input" value={email} onChange={(e)=> setemail(e.target.value)}/>  
              <input type="password" placeholder="Password" className="input" value={password} onChange={(e)=>setpassword(e.target.value)}/>  
              
              <button type="submit" onClick={signin} className="btnsubmit">Login</button>  
              <Link to="/register" style={{textDecoration:"none", color:"black"}}>
              <p className="text98">Do not have account</p>  
              </Link>
              


           </div>
       </div>

    </div>
  )
}
