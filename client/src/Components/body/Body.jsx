import Maincontainer from "../maincontentcontainer/maincontainer"
import Upload from "../upload/Upload"
import "./body.css"

export default function Body() {
  return (
    <div className="body">
      <Upload/> 
       <Maincontainer/>
    </div>
  )
}
