import { Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/profile/profile"
import { useContext } from 'react'; 
import { AuthContext } from "./context/usercontext"; 






export default function App() {
 
  const {currentUser} = useContext(AuthContext); 
  
  return (
    <div>
         <BrowserRouter>
           <Routes>
              <Route path='/'element={currentUser?<Home/>:<Navigate to="/login"/>}/>  
               <Route path="/login" element={<Login/>}/> 
               <Route path='/register' element={<Register/>}/> 
               <Route path="/Profile/:id" element={<Profile/>}/> 
             
           </Routes> 
        </BrowserRouter>   
       
    </div>
  )
}
