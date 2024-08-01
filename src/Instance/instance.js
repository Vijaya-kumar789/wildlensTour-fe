import axios from "axios";
import { BASE_URL } from "../utils/config";

     const instance = axios.create({
      BASE_URL,
   timeout:5000,
   
   headers:{
    'Content-Type' : "application/json",
   },
   
   
});

   const protectedInstance = axios.create({
      BASE_URL,
    timeout:5000,
    headers:{
     'Content-Type' : "application/json",
    },
    
     withCredentials:true,
 });

 export {instance, protectedInstance };