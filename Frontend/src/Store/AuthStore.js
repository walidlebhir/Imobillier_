import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosInstand } from "../RequestHttp/requestHttp";
import { useNavigate } from "react-router-dom";

// --> creatio login pour register et authentication 

export const UseAuthStore = create((set)=>({
    isAuth : false , 
    user : null , 
    token : null , 
    loading  : true , 
    Login : async(email , password )=>{
        
        // creation logique login : 
        try {
            const res = await axiosInstand.post("Login" , {
                username : email , 
                password : password 
            })
            // stockage Token 
            set({token : res.data.token , isAuth:true , loading:false}) 
            localStorage.setItem("token" , res.data.token); 
            console.log(res.data.token) ; 

            return true ; 

        } catch (error) {
            // dbeug 
            console.log(error.response?.data?.detail ) 
            toast.error(error.response?.data?.detail || "Problemme inconue "); 
        }
    }, 

    Register : async(userName , email , password , Role )=>{
        // creation login pour fait register : 
        try {
            const res = await axiosInstand.post("Register", {
                Nom :userName , 
                email : email , 
                password : password , 
                role : Role , 
            })

            // si register effectue alor on fait une information 
            set({token : res.data.token , isAuth : true}) 
            localStorage.setItem("token" ,res.data.token) 
            console.log(res.data.token)
            return true ; 
        } catch (error) {
            // dbeug 
            console.log(error.response?.data?.detail || "Erreur inconue "); 
            toast.error(error.response?.data?.detail || "erreur inconue "); 
        }
    }, 

    chekAUthentication : async()=>{
        const token = localStorage.getItem("token") 
        if(!token){
            set({loading:false})
            return false
        }  ; 
        try {
            const res = await axiosInstand.get("chek/auth", {
                headers: { Authorization: `Bearer ${token}` }
            })

            set({isAuth:true , user:res.data , loading:false })
            console.log(res.data); 
        } catch (error) {
            // debug
            console.log(error.response?.data?.detail) ; 
            toast.error(error.response?.data?.detail || "Problemme incorect ")
        }
    }, 

    // fonction Pour fait deconexion : 
    logout : async()=>{
        // l'orsqeu on fait clque supremet le token 
        try {
            localStorage.removeItem("token") 
            
            return true ; 

            
        } catch (error) {
            // debug 
            console.log("Problemme "+error); 
        }
    }
}))