import React, { useState } from 'react'
import { EntrepriseStore } from '../../Store/EntrepriseStore/Entreprise'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function CreateEntreprise() {

  const Navigate = useNavigate() ; 

    const [entreprise, setEntreprise] = useState({
      Nom: '',
      Description_DT: '',
      Location: '',
    })

    const {createEntreprise} = EntrepriseStore() ; 

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const resultat = await createEntreprise(entreprise.Nom , entreprise.Description_DT , entreprise.Location) ; 
        if(resultat){
          Navigate("/entreprise/dashbord"); 
          toast.success("Bien venue dans votre dashbord") ;
        }
      } catch (error) {
        console.log("problemme") ; 
      }
    
    }

  return (
    <div className="p-6">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Ajouter une Entreprise
          </h1>
          <p className="text-gray-600">
            Remplissez les informations de base de l'entreprise
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom */}
          <div>
            <label htmlFor="Nom" className="block text-sm font-medium text-gray-700 mb-1">
              Nom de l'entreprise *
            </label>
            <input
              type="text"
              id="Nom"
              name="Nom"
              value={entreprise.Nom}
              onChange={(e)=>setEntreprise({...entreprise , Nom:e.target.value})}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors 
                'border-red-500'
              `}
              placeholder="Ex: TechVision Solutions"
            />
            
          </div>

          {/* Description */}
          <div>
            <label htmlFor="Description_DT" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="Description_DT"
              name="Description_DT"
              value={entreprise.Description_DT}
              onChange={(e)=>setEntreprise({...entreprise , Description_DT :e.target.value})}
              rows="3"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors 
                : 'border-gray-300'
              }`}
              placeholder="Description de l'entreprise..."
            />
            
          </div>

          {/* Localisation */}
          <div>
            <label htmlFor="Location" className="block text-sm font-medium text-gray-700 mb-1">
              Localisation *
            </label>
            <input
              type="text"
              id="Location"
              name="Location"
              value={entreprise.Location}
              onChange={(e)=>setEntreprise({...entreprise , Location:e.target.value})}
              
              placeholder="Ex: Paris, France"
            />
            
          </div>

          {/* Bouton */}
          <div className="pt-4">
            <button
              type="submit"
              onClick={()=>handleSubmit()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}