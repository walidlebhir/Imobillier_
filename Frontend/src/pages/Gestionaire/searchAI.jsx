import React, { useState } from 'react';
import { Search, Filter, MapPin, Home, Bed, Bath, DollarSign, Building } from 'lucide-react';
import { PredictionAi } from '../../Store/EntrepriseStore/PredictionStore';

export default function SearchAI() {
    
    const [prompt , setPrompt ] = useState('') ; 
  const searchResults = [
    
  ];

  const {search_ai , datasearch_ai} = PredictionAi() ; 

    const handelSubmitsearch = async(e)=>{
        e.preventDefault();
        try {
            await search_ai(prompt); 
            console.log("search effectue ")
        } catch (error) {
            // debug 
            console.log("problemme dans eve;nmzent search ai "+error); 
        }
    }

  const propertyTypeColors = {
    "House": "bg-blue-50 text-blue-700 border border-blue-100",
    "Apartment": "bg-emerald-50 text-emerald-700 border border-emerald-100",
    "Villa": "bg-purple-50 text-purple-700 border border-purple-100",
    "Studio": "bg-amber-50 text-amber-700 border border-amber-100"
  };

  const statusColors = {
    "Available": "bg-green-50 text-green-700 border border-green-100",
    "Sold": "bg-gray-50 text-gray-700 border border-gray-100",
    "Pending": "bg-yellow-50 text-yellow-700 border border-yellow-100"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-16 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-12 -translate-x-8"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Recherche IA Immobilière</h1>
                <p className="text-gray-300 text-sm">
                  Recherchez des propriétés avec des requêtes naturelles en langage humain
                </p>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="px-3 py-1 bg-white/10 rounded-full">AI-Powered</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full">Natural Language</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche principale */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Recherche par prompt IA</h2>
          <p className="text-gray-600 text-sm">
            Utilisez un langage naturel pour décrire la propriété que vous recherchez
          </p>
        </div>

        <form onSubmit={handelSubmitsearch}>
            <div className="relative">
            <div className="absolute left-4 top-4">
                <Search className="w-5 h-5 text-gray-400" />
            </div>
            <textarea
                value={prompt} 
                onChange={(e)=>setPrompt(e.target.value)}
                placeholder="Ex: 'Je cherche une villa avec 4 chambres à Rabat avec un budget de 500,000$'"
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all min-h-[120px] resize-none"
                rows="3"
            />
            <div className="absolute right-4 bottom-4">
                <button type='submit' className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                Rechercher avec l'IA
                </button>
            </div>
            </div>
        </form>

        {/* Exemples de prompts */}
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-3">Exemples de prompts :</p>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors">
              Appartement 2 chambres à Casablanca sous 300,000$
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors">
              Maison avec jardin à moins de 400,000$
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors">
              Studio moderne en centre-ville budget 200,000$
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors">
              Villa avec piscine à Marrakech 600,000-800,000$
            </button>
          </div>
        </div>
      </div>

      {/* Filtres */}
      

          

      {/* Résultats de recherche */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Résultats de recherche</h2>
              <p className="text-gray-600 text-sm mt-1">
                {searchResults.length} propriétés trouvées correspondant à votre recherche
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900">
                <option>Trier par : Pertinence</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Surface</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des résultats */}
        <div className="divide-y divide-gray-200">
          {datasearch_ai && datasearch_ai[0].map((property) => (
            <div className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Image de la propriété (placeholder) */}
                <div className="lg:w-1/4">
                  <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                    <Home className="w-12 h-12 text-gray-400" />
                  </div>
                </div>

                {/* Détails de la propriété */}
                <div className="lg:w-2/4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {property.property_type} à {property.city}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.address}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                        <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium">{property.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${propertyTypeColors[property.property_type]}`}>
                      {property.property_type}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[property.status]}`}>
                      {property.status}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {property.principale}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                        <Home className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Surface</p>
                        <p className="font-semibold text-gray-800">{property.surface} m²</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mr-3">
                        <Bed className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Chambres</p>
                        <p className="font-semibold text-gray-800">{property.bedroom}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                        <Bath className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Salles de bain</p>
                        <p className="font-semibold text-gray-800">{property.bathroom}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center mr-3">
                        <Building className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Quartier</p>
                        <p className="font-semibold text-gray-800">{property.principale}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prix et actions */}
                <div className="lg:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-6 pt-4 lg:pt-0">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-gray-600 mr-1" />
                      <span className="text-2xl font-bold text-gray-900">
                        ${property["price_£"]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Prix total</p>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full px-4 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all">
                      Voir les détails
                    </button>
                    <button className="w-full px-4 py-2.5 border border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-all">
                      Contacter l'agent
                    </button>
                    <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              Affichage de <span className="font-semibold text-gray-800">1-{searchResults.length}</span> sur <span className="font-semibold text-gray-800">12</span> propriétés
            </p>
            <div className="mt-2 md:mt-0 flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors font-medium">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition-colors">
                3
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section d'information IA */}
      <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Comment fonctionne la recherche IA ?</h3>
            <p className="text-gray-600">
              Notre système d'intelligence artificielle comprend votre requête en langage naturel, analyse le contexte et 
              trouve les propriétés les plus pertinentes en fonction de vos critères. L'IA prend en compte non seulement 
              les filtres standards, mais aussi le contexte et les préférences implicites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}