
import "./App.css";
import "./index.css";
import Tours from "./Components/Tours"
import TourDetails from "./Components/TourDetails"
import HomeNav from './wrappers/HomeNav';
import Register from "./Components/Register";
import Login from './Components/Login';
import Home from './Components/Home';
import SearchResult from "./Components/SearchResult"
import ThankYou from "./Components/ThankYou"
import Layout from "./wrappers/Layout";
// import { userLoader} from "./wrappers/HomeNav"

import { Route, createBrowserRouter,createRoutesFromElements ,RouterProvider, Routes, Navigate, useNavigate} from "react-router-dom";
import { UserProvider } from "./context/ContextApi";
import { useState } from "react";
import { userServices } from "./Instance/userServices";
// import AdminLogin from "./Admin_component/AdminLogin";
import CreateTour from "./Admin_component/CreateTour";
import TourLists from "./Admin_component/TourLists";
import EditTour from "./Admin_component/EditTour"

// const router = createBrowserRouter(
//   createRoutesFromElements(
//       <Route path ="/" element= {<HomeNav/>} >
//         <Route path = "/" element = {<Home/>}/>
//         <Route path = "/tours" element = {<Tours/>}/>
//         <Route path = "/tours/:id" element = {<TourDetails/>}/>
//         <Route path = "/login" element = {<Login/>}/>
//         <Route path = "/register" element = {<Register/>}/>
//         <Route path = "/thank-you" element = {<ThankYou/>}/>
//         <Route path = "/tours/search" element = {<SearchResult/>}/>
        


//       </Route>
//   )

// );

// const App = () => {
// return <RouterProvider router={router} />;
// }

// export default App

const App = () => {

  const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [user,setUser] = useState(null);
    const [isLogin,setIsLogin] = useState(false);

    const navigate = useNavigate()

    const handleClick = (e)=>{
        e.preventDefault();
        
        userServices.login(email,password)
        .then(res => {
          alert (res.data.message);
          
          setEmail('');
          setPassword('');
         
            getUserData()
         
          setIsLogin(true)
          navigate('/')
        })
        .catch(err => {
          alert(err.message)
        })
    
      }

    const handleLogout =(e) => {
      e.preventDefault();
      userServices.logout().then(res => {
        alert (res.data.message);

        setUser(null)
        setTimeout(() => {
          navigate("/home")
        },5000);
    })
    .catch(err => {
      alert(err.message)
    })

  }
  const getUserData = async() =>{
    try {
    
    const user = await userServices.getCurrentUser();
   
      setUser(user.data);
     
      
    } catch (error) {
      console.log(error.message)
    }
  }
  // console.log(user.userName)

   return (
    <>

    <HomeNav user={user} handleLogout={handleLogout}/>
    <Routes >
      
    <Route path = "/" element= {<Navigate to ="/home"/>} />
    <Route path = "/home" element = {<Home/>}/>
    
    <Route path = "/tours" element = {<Tours/>}/>
    <Route path = "/tours/:id" element = {<TourDetails user={user}/>}/>
    <Route path = "/login" element = {<Login handleClick={handleClick} email ={email}  setEmail={setEmail} password ={password} setPassword ={setPassword}/>}/>
    <Route path = "/register" element = {<Register/>}/>
    <Route path = "/checkout-success" element = {<ThankYou/>}/>
    <Route path = "/tours/search" element = {<SearchResult/>}/>
    <Route path = "/admin/createTour" element={<CreateTour />}/>
    <Route path = "/admin/tourLists" element={<TourLists />}/>
    <Route path = "/admin/editTour/:id" element={<EditTour />}/>
 </Routes>


   </>
   
   )
 }
  
  export default App