import React, { useState } from 'react';
import NavbarManager from '../../Components/GestionaireComponents/Navbarmanager';
import ClassificationComponent from '../../Components/GestionaireComponents/ClasificationCompoenent';
import { PredictionAi } from '../../Store/EntrepriseStore/PredictionStore';
import { useEffect } from 'react';


export default function PredictionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showClassificationModal, setShowClassificationModal] = useState(false);
  const [predictions, setPredictions] = useState([
    { id: 1, surface: 120, bedroom: 3, bathroom: 2, city: 'Casablanca', proprety_type: 'Appartement', address: 'Avenue Hassan II, Quartier Californie', predicted_price: 2500000, date: '2024-01-10', status: 'complet' },
    { id: 2, surface: 85, bedroom: 2, bathroom: 1, city: 'Rabat', proprety_type: 'Appartement', address: 'Agdal, Rue Mohammed VI', predicted_price: 1500000, date: '2024-01-09', status: 'complet' },
    { id: 3, surface: 200, bedroom: 4, bathroom: 3, city: 'Marrakech', proprety_type: 'Villa', address: 'Palmeraie, Lotissement Al Maaden', predicted_price: 4500000, date: '2024-01-08', status: 'en_attente' },
    { id: 4, surface: 65, bedroom: 1, bathroom: 1, city: 'Tanger', proprety_type: 'Studio', address: 'Centre ville, Boulevard Mohamed V', predicted_price: 800000, date: '2024-01-07', status: 'complet' },
    { id: 5, surface: 150, bedroom: 3, bathroom: 2, city: 'Fès', proprety_type: 'Maison', address: 'Fès Médina, Rue Talaa Kebira', predicted_price: 1800000, date: '2024-01-06', status: 'complet' },
  ]);
  
  const [predictionData, setPredictionData] = useState({
    surface: '',
    bedroom: '',
    bathroom: '',
    city: '',
    proprety_type: '',
    address: '',
  });

    const {predictionFunction , getPredictionData ,  dataPrediction} = PredictionAi() ; 

  useEffect(()=>{
    getPredictionData() ; 
  },[]); 
  
  const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir', 'Meknès', 'Oujda'];
  const propertyTypes = ['Appartement', 'Villa', 'Studio', 'Maison', 'Duplex', 'Penthouse', 'Terrain'];
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPredictionData({
        ...predictionData,
        [name]: value,
        });
    };
  
    const handleSubmitPrediction = (e) => {
        e.preventDefault();
        predictionFunction(predictionData); 
        setPredictionData({
            surface: '',
            bedroom: '',
            bathroom: '',
            city: '',
            proprety_type: '',
            address: '',
        });
        
        
        toggleModal();
        getPredictionData(); 
        
        
    };

  const getPropertyTypeColor = (type) => {
    switch(type) {
      case 'Appartement': return 'bg-blue-50 text-blue-700 border border-blue-100';
      case 'Villa': return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      case 'Studio': return 'bg-amber-50 text-amber-700 border border-amber-100';
      case 'Maison': return 'bg-cyan-50 text-cyan-700 border border-cyan-100';
      case 'Duplex': return 'bg-violet-50 text-violet-700 border border-violet-100';
      case 'Penthouse': return 'bg-rose-50 text-rose-700 border border-rose-100';
      case 'Terrain': return 'bg-slate-100 text-slate-700 border border-slate-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'complet': return 'bg-green-50 text-green-700 border border-green-100';
      case 'en_attente': return 'bg-yellow-50 text-yellow-700 border border-yellow-100';
      default: return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  const totalPredictions = predictions.length;
  const averagePrice = Math.floor(predictions.reduce((sum, pred) => sum + pred.predicted_price, 0) / predictions.length);
  const highestPrice = Math.max(...predictions.map(p => p.predicted_price));
  const lowestPrice = Math.min(...predictions.map(p => p.predicted_price));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* En-tête de la page */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full -translate-y-16 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full translate-y-12 -translate-x-8"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Prédictions Immobilières</h1>
                  <p className="text-slate-300 text-sm">
                    Estimation de prix par intelligence artificielle
                  </p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowClassificationModal(true)}
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 font-medium py-2.5 px-5 rounded-lg shadow transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 00-1-1h-5a1 1 0 100 2h4v3h-4zM3 13a1 1 0 100 2h5a1 1 0 100-2H3zM3 5a1 1 0 000 2h5a1 1 0 100-2H3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Classification</span>
                  </button>
                  <button 
                    onClick={toggleModal}
                    className="inline-flex items-center gap-2 bg-white text-slate-800 hover:bg-slate-100 font-medium py-2.5 px-5 rounded-lg shadow transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Nouvelle prédiction</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Total prédictions</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{totalPredictions}</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Prix moyen</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{averagePrice.toLocaleString()} MAD</p>
              </div>
              <div className="bg-emerald-50 p-2 rounded-lg">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Prix max</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{highestPrice.toLocaleString()} MAD</p>
              </div>
              <div className="bg-rose-50 p-2 rounded-lg">
                <svg className="w-5 h-5 text-rose-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Prix min</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{lowestPrice.toLocaleString()} MAD</p>
              </div>
              <div className="bg-amber-50 p-2 rounded-lg">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des prédictions */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Historique des prédictions</h2>
                <p className="text-gray-600 text-xs mt-0.5">{predictions.length} prédictions trouvées</p>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                    Propriété
                  </th>
                  <th scope="col" className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                    Type
                  </th>
                  <th scope="col" className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                    Surface
                  </th>
                  <th scope="col" className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                    Localisation
                  </th>
                  <th scope="col" className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                    Prix estimé
                  </th>
                  <th scope="col" className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                    Date
                  </th>
                  <th scope="col" className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataPrediction && dataPrediction.map((prediction) => (
                  <tr key={prediction.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">{prediction.proprety_type} à {prediction.city}</p>
                        <p className="text-gray-500 text-xs truncate max-w-[200px]">{prediction.address}</p>
                      </div>
                    </td>
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPropertyTypeColor(prediction.proprety_type)}`}>
                          {prediction.proprety_type}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">{prediction.surface} m²</p>
                        <p className="text-xs text-gray-500">{prediction.bedroom} ch, {prediction.bathroom} sdb</p>
                      </div>
                    </td>
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div>
                        <div className="flex items-center gap-1 font-medium text-gray-900">
                          <svg className="h-3.5 w-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {prediction.city}
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold text-gray-900">{prediction.price_predict.toLocaleString()} MAD</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div className="text-gray-600 text-xs">{prediction.created_at}</div>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(prediction.status)}`}>
                        {prediction.status === 'complet' ? (
                          <>
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                            Complet
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></span>
                            En attente
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-xs">
                Affichage de <span className="font-semibold text-gray-800">{predictions.length}</span> prédictions
              </p>
              <div className="mt-2 md:mt-0 flex items-center gap-1">
                <button className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-7 h-7 flex items-center justify-center bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors font-medium">
                  1
                </button>
                <button className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-100 transition-colors">
                  2
                </button>
                <button className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-100 transition-colors">
                  3
                </button>
                <button className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal pour la prédiction AI */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleModal}
      >
        <div className="absolute inset-0 bg-gray-900/50"></div>
      </div>

      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-2xl z-50 transform transition-transform duration-300 ease-in-out ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full bg-white shadow-xl overflow-y-auto">
          {/* En-tête de la modal */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  <h2 className="text-xl font-semibold">Nouvelle prédiction</h2>
                </div>
                <p className="text-slate-300 text-sm">
                  Remplissez les informations pour obtenir une estimation de prix
                </p>
              </div>
              <button 
                onClick={toggleModal}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Corps de la modal */}
          <div className="p-6">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Comment fonctionne notre modèle ?</h3>
                  <p className="mt-0.5 text-blue-700 text-sm">
                    Notre algorithme analyse plusieurs facteurs pour générer une estimation de prix précise basée sur les données du marché.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitPrediction}>
              <div className="space-y-4">
                {/* Surface */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Surface (m²) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="surface"
                      value={predictionData.surface}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm"
                      placeholder="Ex: 120"
                      min="1"
                      step="0.5"
                      required
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Surface totale en mètres carrés</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Chambres */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Chambres <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="bedroom"
                        value={predictionData.bedroom}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm"
                        placeholder="Ex: 3"
                        min="0"
                        required
                      />
                      <div className="absolute left-3 top-2.5 text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Salles de bain */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Salles de bain <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="bathroom"
                        value={predictionData.bathroom}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm"
                        placeholder="Ex: 2"
                        min="0"
                        required
                      />
                      <div className="absolute left-3 top-2.5 text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0112 0c0 .459-.031.907-.086 1.333A5 5 0 0010 11z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ville */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Ville <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={predictionData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm"
                    required
                  >
                    <option value="">Sélectionnez une ville</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Type de propriété */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Type de propriété <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="proprety_type"
                    value={predictionData.proprety_type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm"
                    required
                  >
                    <option value="">Sélectionnez un type</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Adresse */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Adresse <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={predictionData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm resize-none"
                    placeholder="Ex: Avenue Hassan II, Quartier Californie, Casablanca"
                    rows="2"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Actions du formulaire */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm hover:shadow transition-all flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Générer la prédiction
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal pour la classification */}
      <ClassificationComponent 
        isOpen={showClassificationModal}
        onClose={() => setShowClassificationModal(false)}
      />
    </div>
  );
}