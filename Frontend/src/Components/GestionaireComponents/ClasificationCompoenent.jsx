import React, { useState } from 'react';
import { PredictionAi } from '../../Store/EntrepriseStore/PredictionStore';


export default function ClassificationComponent({ isOpen, onClose }) {
  const [classificationData, setClassificationData] = useState({
    surface: '',
    bedroom: '',
    bathroom: '',
    city: '',
    proprety_type: '',
    address: '',
  });


  const {classPro , probabilite,classificationProp  } = PredictionAi() ; 
  const [resulatat , setresulatat ] = useState(null) ; 
  
  const [isLoading, setIsLoading] = useState(false);
  
  const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir', 'Meknès', 'Oujda'];
  const propertyTypes = ['Appartement', 'Villa', 'Studio', 'Maison', 'Duplex', 'Penthouse', 'Terrain'];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassificationData({
      ...classificationData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
        classificationProp(classificationData)
        setresulatat(classPro) ; 
    }catch(error){
        // debug 
        console.log("Probleme "+error) ; 
    }finally{
        setIsLoading(false); 
    }
    
  };
  
  const resetForm = () => {
    setClassificationData({
      surface: '',
      bedroom: '',
      bathroom: '',
      city: '',
      
    });
    setresulatat(null)  ;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-gray-900/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* En-tête de la modal */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 00-1-1h-5a1 1 0 100 2h4v3h-4zM3 13a1 1 0 100 2h5a1 1 0 100-2H3zM3 5a1 1 0 000 2h5a1 1 0 100-2H3z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-2xl font-semibold">Classification IA</h2>
                  </div>
                  <p className="text-gray-300">
                    Analysez une propriété pour déterminer sa catégorie et son potentiel
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Corps de la modal */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {!resulatat? (
                <>
                  <div className="mb-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Comment fonctionne la classification ?</h3>
                        <p className="mt-1.5 text-gray-600">
                          Notre modèle d'IA analyse les caractéristiques de la propriété pour déterminer sa catégorie (Budget, Standard, Premium, Luxe) 
                          et estimer son potentiel de valorisation sur le marché.
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Surface */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            Surface (m²) <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              name="surface"
                              value={classificationData.surface}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-gray-800"
                              placeholder="Ex: 120"
                              min="1"
                              step="0.5"
                              required
                            />
                            <div className="absolute left-4 top-3 text-gray-400">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Ville */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            Ville <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="city"
                            value={classificationData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-gray-800 appearance-none"
                            required
                          >
                            <option value="">Sélectionnez une ville</option>
                            {cities.map((city) => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Chambres */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            Nombre de chambres <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              name="bedroom"
                              value={classificationData.bedroom}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-gray-800"
                              placeholder="Ex: 3"
                              min="0"
                              required
                            />
                            <div className="absolute left-4 top-3 text-gray-400">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Salles de bain */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            Nombre de salles de bain <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              name="bathroom"
                              value={classificationData.bathroom}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-gray-800"
                              placeholder="Ex: 2"
                              min="0"
                              required
                            />
                            <div className="absolute left-4 top-3 text-gray-400">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0112 0c0 .459-.031.907-.086 1.333A5 5 0 0010 11z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      </div>

                    {/* Actions du formulaire */}
                    <div className="mt-10 pt-8 border-t border-gray-200 flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        
                        className="px-8 py-3.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyse en cours...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Lancer la classification
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Résultats de la classification */
                <div>
                  <div className="mb-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Analyse terminée</h3>
                      <p className="text-gray-600">
                        Voici les résultats de la classification de votre propriété
                      </p>
                    </div>
                  </div>

                  {/* Résultats principaux */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Classe */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">Catégorie attribuée</h4>
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 00-1-1h-5a1 1 0 100 2h4v3h-4zM3 13a1 1 0 100 2h5a1 1 0 100-2H3zM3 5a1 1 0 000 2h5a1 1 0 100-2H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800 mb-2">{classPro}</div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                          Confiance: {classPro}
                        </div>
                      </div>
                    </div>

                    {/* Probabilité */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">Probabilité</h4>
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800 mb-2">
                          {(probabilite * 100).toFixed(2)} %
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-gray-800 h-2.5 rounded-full" 
                           
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Niveau de confiance du modèle</p>
                      </div>
                    </div>

                    {/* Fourchette de prix */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">Fourchette de prix estimée</h4>
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800 mb-2"></div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                          Estimation basée sur la catégorie
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  {/* Actions */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <button
                      onClick={resetForm}
                      className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Nouvelle analyse
                    </button>
                    <div className="flex gap-3">
                      <button
                        onClick={onClose}
                        className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Fermer
                      </button>
                      <button className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 shadow-sm hover:shadow transition-all flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Exporter le rapport
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}