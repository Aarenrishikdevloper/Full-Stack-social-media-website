import Navbar from "../../Components/Navbar/Navbar";
import './profile.css'


import Profileleftbar from "../../Components/profileleftbar/Profileleftbar";
import Profilebody from "../../Components/profilebody/Profilebody";

import Profilerightbar from "../../Components/profilerightbar/Profilerightbar";

export default function Profile() {   
 
  return (
    <div className="profile">
        <Navbar/>
        <div className="compopent">
          <Profileleftbar/> 
          <Profilebody  />
          
          <Profilerightbar/> 
          
          
        </div>
    </div>
  )
}
