import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const PublicRoute = () => {

    const {user} = useContext(AuthContext);
   
    if( user==null || user.role == 'user'   )
  return <Outlet/>
  
}


export default PublicRoute