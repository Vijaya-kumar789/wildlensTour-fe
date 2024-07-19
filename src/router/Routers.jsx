import { Navigate, Route, Routes } from "react-router-dom"
import Home from "../Components/Home"
import Tours from "../Components/Tours"
import TourDetails from "../Components/TourDetails"
import Login from "../Components/Login"
import Register from "../Components/Register"
import SearchResult from "../Components/SearchResult"
import ThankYou from "../Components/ThankYou"
import { UserProvider } from "../context/ContextApi"

const Routers = () => {


   
  return (
 
     <Routes>
        <Route path = "/" element= {<Navigate to ="/home"/>} />
        <Route path = "/home" element = {<Home/>}/>
        <Route path = "/tours" element = {<Tours/>}/>
        <Route path = "/tours/:id" element = {<TourDetails/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/thank-you" element = {<ThankYou/>}/>
        <Route path = "/tours/search" element = {<SearchResult/>}/>
     </Routes>
    
  )
}

export default Routers