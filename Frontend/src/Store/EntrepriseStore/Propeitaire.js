import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstand } from "../../RequestHttp/requestHttp";


export const PropritaireManageStore = create((set) =>({

    /**
     * code pour manipulation des proprietaire 
     * ajouter 
     * modeie 
     * suprimer 
     * showAll propritaire --> id entreprise 
     * show byid 
    */ 
    DataPropritaire : [] , 
    OnePro : null , 


    createpropritaire : async(formData)=>{
        try {
            const res = await axiosInstand.post("create/newProprietaire", formData); 
            console.log(res.data) ; 
            toast.success(res.data) ; 
        } catch (error) {
            // debug 
            console.log(error.response?.data?.detail || "Problemme dans la creation de noveau proprietaire "); 
            toast.error(error.response?.data?.detail || "problemme inconue ") ; 
        }
    }, 


    uplodaeImages : async()=>{
        return null ; 
    }, 

    getAllproprietaire : async()=>{
        try {
            const res = await axiosInstand.get("get/Proprietaire"); 
            set({DataPropritaire : res.data}) 
            console.log(res.data) ; 
        } catch (error) {
            // debug 
            console.log(error.response?.data?.detail || "problemme dans la fonction get allEntreprise "); 
            toast.error(error.response?.data?.detail || "Problemme inconue ") ;  
        }
    }, 



    showOneEntreprise : async(id)=>{
        try{
            const res = await axiosInstand.get(`/get/onepropritaire/${id}`) 
            set({OnePro : res.data}) ; 
        }catch(error){
            // debug 
            console.log(error.response?.data?.detail || "Problemme dans show fonction "); 
            toast.error(error.response?.data?.detail || "Problemme inconue ") ; 
        }
    }, 

    // delet Proprietaire 

    deleteOnePropritaire : async(id)=>{
        try {
            const res = await axiosInstand.delete(`delete/proprietaire/${id}`) 
            toast.success(res.data.message) ; 
        } catch (error) {
            // debug 
            console.log(error.response?.data?.detail || "Problemme au niveau de supresion de propritaire ") ; 
            toast.error(error.response?.data?.detail || "Prolemme inconue ") ; 

        } 
    }

    


})); 