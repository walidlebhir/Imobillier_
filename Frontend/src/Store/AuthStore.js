import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";


// --> creatio login pour register et authentication 

export const AuthStore = create((set)=>({
    isAuth : false , 
    user : auth , 

    Login : async(email , password )=>{

    }, 

    Register : async(userName , email , password )=>{
        
    }
}))