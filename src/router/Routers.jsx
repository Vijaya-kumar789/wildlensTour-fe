import { Navigate, Route, Routes } from "react-router-dom"
import Home from "../Components/Home"
import Tours from "../Components/Tours"
import TourDetails from "../Components/TourDetails"
import Login from "../Components/Login"
import Register from "../Components/Register"
import SearchResult from "../Components/SearchResult"
import ThankYou from "../Components/ThankYou"
import { UserProvider } from "../context/ContextApi"
import HomeNav from "../wrappers/HomeNav"
import CreateTour from "../Admin_component/CreateTour";
import TourLists from "../Admin_component/TourLists";
import EditTour from "../Admin_component/EditTour"
import DashBoard from "../Admin_component/Dashboard"
import Bookings from "../Admin_component/Bookings"
import PrivateRoutes from "./PrivateRoutes"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import PublicRoute from "./PublicRoute"
import MyBooking from "../Components/MyBooking"
import HomeFooter from "../wrappers/HomeFooter"

const Routers = () => {

  const {user} = useContext(AuthContext)
   
  return (
   <>
 
  
     <Routes>
      
     {/* <Route element={<PublicRoute />}> */}
     <Route element={<HomeNav />}>
        <Route path = "/" element= {<Navigate to ="/home"/>} />
        <Route path = "/home" element = {<Home/>}/>
        <Route path = "/tours" element = {<Tours/>}/>
        <Route path = "/tours/:id" element = {<TourDetails/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/checkout-success" element = {<ThankYou/>}/>
        <Route path = "/tours/search" element = {<SearchResult/>}/>
        <Route path = "/myBookings" element = {<MyBooking/>}/>
        </Route>
        {/* </Route> */}
        <Route element={<PrivateRoutes/>}>
        <Route element={<DashBoard/>}>
        <Route path = "/admin/createTour" element={<CreateTour />}/>
         <Route path = "/admin/tourLists" element={<TourLists />}/>
         <Route path = "/admin/editTour/:id" element={<EditTour />}/>
         <Route path = "/admin/bookings" element={<Bookings />}/>
         </Route>
         </Route>
        
     </Routes>
     
     </>
  )
}

export default Routers