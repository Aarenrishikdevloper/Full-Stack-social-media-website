import Navbar from "../../Components/Navbar/Navbar";
import './Home.css'
import Sidebar from "../../Components/sidebar/Sidebar";
import Rightbar from "../../Components/righbar/rightbar";
import Body from "../../Components/body/Body";

export default function Home() {
  return (
    <div className="home">
        <Navbar/>
        <div className="compopent">
          <Sidebar/>
           <Body/>
          <Rightbar/>
          
        </div>
    </div>
  )
}
