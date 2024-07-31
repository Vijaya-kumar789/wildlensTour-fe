import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userServices } from "../Instance/userServices";
import { toast } from "react-toastify";


const userContext = createContext({});

export const UserProvider =({Children}) => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [userData,setUserData] = useState({});

    const navigate = useNavigate()

    const handleClick = (e)=>{
        e.preventDefault();
        
        userServices.login(email,password)
        .then(res => {
          toast.success (res.data.message);
          
          setEmail('');
          setPassword('');
          
          navigate('/')
        })
        .catch(err => {
          toast.error(err)
        })
    
      }

    

  const getUserData = async() =>{
    try {
    
    const user = await userServices.getCurrentUser();
   
      setUserData(user.data);
     
      
    } catch (error) {
      console.log(error.message)
    }
  }
  

  useEffect(() => {
    
  },[setUserData])
//   console.log(userData)
//   console.log(userData.userName)

    return (
        <userContext.Provider value ={{email , setEmail,password , setPassword,userData,setUserData,handleClick}}>
            {Children}
        </userContext.Provider>
    );

};


export default userContext;