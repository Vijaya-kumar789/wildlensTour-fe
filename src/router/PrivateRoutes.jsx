import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"


const PrivateRoutes = () => {

    const {user} = useContext(AuthContext);
   
//  user.role == 'admin'? <Outlet/> : user.role == 'user'?  <Navigate to = "/home"/> : <Navigate to = "/login"/> 
  
    if(user && user.role == 'user'){
       
        return <Navigate to = "/home"/>
        
    } else if(user==null || !user.role == 'admin'){
      return  <Navigate to = "/login"/>
    } else{
      return <Outlet/> 
    }
  
}

export default PrivateRoutes

