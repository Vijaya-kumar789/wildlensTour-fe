
import { instance,protectedInstance } from "./instance";


export const userServices = {

  
    register: async (userName , email, password) => {
        
        return await instance.post("/users/register",{
            userName , email, password
        })
    },

    login: async ( email, password) => {
        
        return await instance.post("/users/login",{
            email, password
        },{
            withCredentials:true
        }
    )
    },

    getCurrentUser : async () =>{
        return await protectedInstance.get('/users/profile')
    },

    logout : async() => {
        return await protectedInstance.get('/users/logout')
    },

    addReview : async(reviewText , tourRating,id) => {
       
        return await protectedInstance.post(`/review/${id}`,{
            reviewText , tourRating
        })
    },

    createBooking: async(fullName,phone,guestSize,bookAt,totalAmount,id) => {
        return await protectedInstance.post(`/bookings/checkout-session/${id}`,{
            fullName,phone,guestSize,bookAt,totalAmount
        })
    }
};