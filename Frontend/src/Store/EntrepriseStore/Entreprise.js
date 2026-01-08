import toast from "react-hot-toast";
import { create } from "zustand"; 
import { axiosInstand } from "../../RequestHttp/requestHttp";
import axios from "axios";


/**
 * creation  d'inserion d'entreprise 
 * 
*/


export const EntrepriseStore = create((set)=>({

    dataEntreprise : null , 

    createEntreprise: async(Nom , Description_DT , Location )=>{
        try {
            const res = await axiosInstand.post("add/entreprise" ,{
                Nom : Nom , 
                Description_DT :Description_DT , 
                Location : Location 
            }); 

            toast(res.data.message) ; 
            return true ; 
        } catch (error) {
            // dbeug 
            console.log(error.response?.data?.detail); 
            toast.error(error.response?.data?.detail || "Errer inconue ") ; 

        }
    }, 

    // fonction pour show Information Entreprise 

    getentreprise : async()=>{
        try {
            const res = await axiosInstand.get("get/entreprise") ; 
            set({dataEntreprise : res.data}) ; 

        } catch (error) {
            // dbeug 
            console.log(error.response?.data?.detail) ; 
            toast.error(error.response?.data?.detail) ; 
            
        }
    }

})); 

