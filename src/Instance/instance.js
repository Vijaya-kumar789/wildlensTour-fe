import axios from "axios";


const baseURL = 'https://wildlens-tour-be-i8b8.onrender.com/api/v1';

     const instance = axios.create({
   baseURL,
   timeout:5000,
   
   headers:{
    'Content-Type' : "application/json",
   },
   
   
});

   const protectedInstance = axios.create({
    baseURL,
    timeout:5000,
    headers:{
     'Content-Type' : "application/json",
    },
    
     withCredentials:true,
 });

 export {instance, protectedInstance };