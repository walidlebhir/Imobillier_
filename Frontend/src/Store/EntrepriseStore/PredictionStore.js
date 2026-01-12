import { create } from "zustand";
import { axiosInstand  } from "../../RequestHttp/requestHttp";
import toast from "react-hot-toast";



export const   PredictionAi = create((set)=>({

    dataPrediction : null , 
    classPro : null , 
    probabilite : null , 
    datasearch_ai : null , 
    
    predictionFunction :  async(predictionData)=>{
            try {
                const res = await axiosInstand.post("prediction/price", predictionData); 
                // debug 
                console.log(res.data.message ) ; 
                toast.success("prediction effectue")

            } catch (error) {
                // debug 
                console.log(error.response?.data?.detail || "Problemme inconue dans le server ") ; 
                toast.error(error.response?.data?.detail || "Problemme dans le server inconue") ; 

            }
    }, 

    classificationProp : async(datapropritaire )=>{
        try {
            const res = await axiosInstand.post("classification/propritie" , datapropritaire)
            set({
                classPro : res.data.classpro , 
                probabilite : res.data.Probabilite
            }); 
            // debug 
            console.log("class propritaire  : "+res.data.classpro) ; 
            console.log("probabilite : "+res.data.Probabilite) ; 
            
        } catch (error) {
            // debug 
            console.log(error.response?.data?.detail || "Problemm dans le server inconus ") ; 
            toast.error(error.response?.data?.detail || "Problemme dans le server inconus ")
        }
    }, 

    // recuperation des prediction :  
    getPredictionData : async()=>{
        try{
            const res = await axiosInstand.get("get/prediction/data") ; 
            set({
                dataPrediction : res.data
            }); 
        }catch(error){
            // debug 
            console.log(error.response?.data?.detail || "Problemme dans le server inconue ") ; 
            toast.error(error.response?.data?.detail || "Propblemme dans le server ") ; 
        }
    }, 

    search_ai : async(prompt)=>{
        try {
            const res = await axiosInstand.post("/search/sementique" ,{
                "prompt" : prompt
            }); 
            
            set({
                datasearch_ai : res.data.data_serch
            }); 
            toast.success("search efectue "); 
            console.log(res.data.data_serch); 

        } catch (error) {
            // debug 
            console.log(error.response?.data?.detail || "Problemme dans le serevr ") ; 
            toast.error(error.response?.data?.detail || "Problemme dans le server ") ; 

        }
    }


}))