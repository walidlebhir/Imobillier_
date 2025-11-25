import { create } from "zustand"; 
import { axiosInstand } from "../../RequestHttp/requestHttp";
import toast from "react-hot-toast";


export const UseRegisterStore = ((set)=>({
   

    RegisterEntre : async(Nom ,Description_DT ,Location )=>{
        try {
            token = localStorage.getItem("token")
            const res = await axiosInstand.post({
                Nom : Nom , 
                Description_DT : Description_DT , 
                Location : Location 
            },{
                Headers : {
                    Authorization : `Bearer ${token}`
                }
            })

            toast.success(res.data.message) ; 
            return true ; 
        } catch (error) {
            // debug 
            console.log(error.response?.data?.detail || "erreur inconue ") ;
            toast.error(error.response?.data?.detail || "Problemme dans le server ") ; 

        }
        
    }

    
}))