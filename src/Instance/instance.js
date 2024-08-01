import axios from "axios";
import { REACT_APP_API_URL } from "../utils/config";


     const instance = axios.create({
      REACT_APP_API_URL,
   timeout:5000,
   
   headers:{
    'Content-Type' : "application/json",
   },
   
   
});

   const protectedInstance = axios.create({
      REACT_APP_API_URL,
    timeout:5000,
    headers:{
     'Content-Type' : "application/json",
    },
    
     withCredentials:true,
 });

 export {instance, protectedInstance };