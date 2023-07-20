import { useContext, useEffect, useState } from 'react'
import Friends from './friends'
import './rightbar.css'
import axios from 'axios'
import { AuthContext } from '../../context/usercontext'


export default function Rightbar() {
  const[use, setuser] = useState([]);   
  
  const { currentUser} = useContext(AuthContext);
   useEffect(()=>{
     axios.get('http://localhost:3000/userall',).then(res=>{
       setuser(res.data); 
       console.log(setuser);
     }) 
   },[])  
   
  
  return (
    <div className="rightcontainer">
        <div className="first">
            <div className="adscontainer">
                 <img src="https://www.shutterstock.com/image-vector/black-tea-cup-vector-realistic-260nw-1983661745.jpg" className="poster" /> 
                 <div>
                    <p className='text1' style={{marginTop:-20}}>Premium Tea</p> 
                    <p className='text2' style={{marginTop:-16}}>Buy our Premium Tea</p>
                 </div> 
                 
            </div> 
            <div className="adscontainer">
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmz0MZWmPb7oJw41dvuy9OX99j0lQmIcATCA&usqp=CAU" className="poster" /> 
                 <div>
                    <p className='text1' style={{marginTop:-20}}>Premium Coffee</p> 
                    <p className='text2' style={{marginTop:-16}}>Buy our Premium coffee</p>
                 </div> 
                 
            </div>  
            
        </div>
        <div className="secound">
            <h3 className='heading2'>Suggested for you</h3>      
            {use.map((res)=>{
               if(currentUser._id !== res._id && !res.followers.includes(currentUser._id)){
               return ( <Friends friends={res} key={res._id}/>)
               }
         })}
           
        </div>
    </div>
  )
}
