import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Filter, 
  ChevronRight,
  Home,
  Building,
  MapPin,
  DollarSign,
  Eye,
  Upload
} from 'lucide-react';
import { PropritaireManageStore } from '../../Store/EntrepriseStore/Propeitaire';
import UploadImagesModal from '../../Components/GestionaireComponents/UplodeImages';

export default function Propritaire() {

  const { DataPropritaire, deleteOnePropritaire, createpropritaire, getAllproprietaire } = PropritaireManageStore();
  const [proprietaires, setProprietaires] = useState(DataPropritaire);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    titre: '',
    type_pro: 'Appartement',
    surface: '',
    chamber: '',
    ville: '',
    code_ville: '',
    quartie: '',
    prix: '',
    description: ''
  });

  const typesProprietes = ['Tous', 'Villa', 'Appartement', 'Maison', 'Studio', 'Commerce', 'Terrain'];

  const filteredProprietaires = DataPropritaire.filter(proprietaire => {
    const matchesSearch = 
      proprietaire.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proprietaire.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proprietaire.quartie.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'Tous' || proprietaire.type_pro === selectedType;
    
    return matchesSearch && matchesType;
  });

  const openAddForm = () => {
    resetForm();
    setShowAddForm(true);
  };

  const openEditForm = (proprietaire) => {
    setFormData({
      titre: proprietaire.titre,
      type_pro: proprietaire.type_pro,
      surface: proprietaire.surface,
      chamber: proprietaire.chamber,
      ville: proprietaire.ville,
      code_ville: proprietaire.code_ville,
      quartie: proprietaire.quartie,
      prix: proprietaire.prix.toString().replace(/,/g, ''),
      description: proprietaire.description
    });
    setEditingId(proprietaire.id);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      titre: '',
      type_pro: 'Appartement',
      surface: '',
      chamber: '',
      ville: '',
      code_ville: '',
      quartie: '',
      prix: '',
      description: ''
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setProprietaires(prev => prev.map(p => 
        p.id === editingId 
          ? { 
              ...p, 
              ...formData, 
              prix: parseFloat(formData.prix).toLocaleString('fr-FR'),
              id: editingId,
              status: p.status
            } 
          : p
      ));
    } else {
      try {
        createpropritaire(formData);
      } catch (error) {
        console.log("Problème : " + error);
      }
    }
    // aprer la creation de chaque proprietaire on fait une 
    getAllproprietaire(); 
    
    setShowAddForm(false);
    resetForm();
  };

  const handleDelete = (id) => {
    deleteOnePropritaire(id);
    getAllproprietaire();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponible': return 'bg-green-50 text-green-700 border border-green-100';
      case 'Loué': return 'bg-blue-50 text-blue-700 border border-blue-100';
      case 'Vendu': return 'bg-purple-50 text-purple-700 border border-purple-100';
      case 'En attente': return 'bg-yellow-50 text-yellow-700 border border-yellow-100';
      default: return 'bg-gray-50 text-gray-700 border border-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Villa': return <Home className="h-3.5 w-3.5" />;
      case 'Appartement': return <Building className="h-3.5 w-3.5" />;
      case 'Maison': return <Home className="h-3.5 w-3.5" />;
      case 'Studio': return <Building className="h-3.5 w-3.5" />;
      default: return <Building className="h-3.5 w-3.5" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Appartement': return 'bg-blue-50 text-blue-700 border border-blue-100';
      case 'Villa': return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      case 'Studio': return 'bg-amber-50 text-amber-700 border border-amber-100';
      case 'Maison': return 'bg-cyan-50 text-cyan-700 border border-cyan-100';
      case 'Commerce': return 'bg-violet-50 text-violet-700 border border-violet-100';
      case 'Terrain': return 'bg-slate-100 text-slate-700 border border-slate-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-100';
    }
  };

  useEffect(() => {
    getAllproprietaire();
  }, []);

  const [OpenUplode, SetOpenUplode] = useState(false);
  const [idPro, SetidPro] = useState(null);

  const handelOpenModal = (id_Pro) => {
    SetOpenUplode(true);
    SetidPro(id_Pro);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* En-tête */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full -translate-y-16 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full translate-y-12 -translate-x-8"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Gestion des Propriétés</h1>
                <p className="text-slate-300 text-sm">
                  Gérez et suivez toutes vos propriétés immobilières
                </p>
              </div>
              <button
                onClick={openAddForm}
                className="inline-flex items-center gap-2 bg-white text-slate-800 hover:bg-slate-100 font-medium py-2.5 px-5 rounded-lg shadow transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Ajouter une propriété</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7 mt-7">
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Total propriétés</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{DataPropritaire.length}</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Disponibles</p>
                <p className="text-xl font-bold text-gray-800 mt-1">
                  {DataPropritaire.filter(p => p.status === 'Disponible').length}
                </p>
              </div>
              <div className="bg-emerald-50 p-2 rounded-lg">
                <Home className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Loués</p>
                <p className="text-xl font-bold text-gray-800 mt-1">
                  {DataPropritaire.filter(p => p.status === 'Loué').length}
                </p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Vendus</p>
                <p className="text-xl font-bold text-gray-800 mt-1">
                  {DataPropritaire.filter(p => p.status === 'Vendu').length}
                </p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Rechercher par titre, ville ou quartier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                />
              </div>
            </div>
            
            <div className="md:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
                >
                  {typesProprietes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau des propriétaires */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Liste des propriétés</h2>
              <p className="text-gray-600 text-xs mt-0.5">{DataPropritaire.length} propriétés trouvées</p>
            </div>
            <div className="mt-2 md:mt-0 flex items-center gap-2">
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                Filtres avancés
              </button>
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
                  Prix
                </th>
                <th scope="col" className="py-2 px-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {DataPropritaire.length > 0 ? (
                DataPropritaire.map((proprietaire) => (
                  <tr key={proprietaire.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">{proprietaire.titre}</p>
                        <p className="text-gray-500 text-xs truncate max-w-[200px]">{proprietaire.description}</p>
                      </div>
                    </td>
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <span className="text-blue-600">
                          {getTypeIcon(proprietaire.type_pro)}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(proprietaire.type_pro)}`}>
                          {proprietaire.type_pro}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">{proprietaire.surface} m²</p>
                        <p className="text-xs text-gray-500">{proprietaire.chamber} chambre(s)</p>
                      </div>
                    </td>
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div>
                        <div className="flex items-center gap-1 font-medium text-gray-900">
                          <MapPin className="h-3.5 w-3.5 text-gray-400" />
                          {proprietaire.ville}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{proprietaire.quartie}, {proprietaire.code_ville}</p>
                      </div>
                    </td>
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5 text-green-600" />
                        <span className="font-semibold text-gray-900">{proprietaire.prix} DH</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditForm(proprietaire)}
                          className="text-gray-600 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(proprietaire.id)}
                          className="text-gray-600 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Voir détails"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handelOpenModal(proprietaire.id)}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Uploader des images"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <div className="text-gray-500">
                      <Building className="h-8 w-8 mx-auto mb-3 text-gray-300" />
                      <p className="font-medium">Aucune propriété trouvée</p>
                      <p className="text-sm mt-1">Modifiez vos critères de recherche ou ajoutez une nouvelle propriété.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <UploadImagesModal 
          id_pro={idPro} 
          isOpen={OpenUplode} 
          onClose={() => SetOpenUplode(false)}
        />
        
        {DataPropritaire.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-xs">
                Affichage de <span className="font-semibold text-gray-800">{DataPropritaire.length}</span> propriétés
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
        )}
      </div>

      {/* Modal pour la formulaire d'ajout/modification */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${showAddForm ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowAddForm(false)}
      >
        <div className="absolute inset-0 bg-gray-900/50"></div>
      </div>

      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-2xl z-50 transform transition-transform duration-300 ease-in-out ${showAddForm ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full bg-white shadow-xl overflow-y-auto">
          {/* En-tête de la modal */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {editingId ? (
                    <Edit2 className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                  <h2 className="text-xl font-semibold">
                    {editingId ? 'Modifier la propriété' : 'Ajouter une propriété'}
                  </h2>
                </div>
                <p className="text-slate-300 text-sm">
                  {editingId ? 'Modifiez les informations de la propriété' : 'Remplissez les informations pour ajouter une nouvelle propriété'}
                </p>
              </div>
              <button 
                onClick={() => setShowAddForm(false)}
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
                  <h3 className="text-sm font-medium text-blue-800">Informations importantes</h3>
                  <p className="mt-0.5 text-blue-700 text-sm">
                    Tous les champs marqués d'un astérisque (*) sont obligatoires. Assurez-vous de fournir des informations exactes.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Titre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Titre de la propriété <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={(e) => setFormData({...formData, titre: e.target.value})}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm"
                    placeholder="Ex: Villa moderne avec piscine"
                  />
                </div>
                
                {/* Type et Surface */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Type de propriété <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="type_pro"
                      value={formData.type_pro}
                      onChange={(e) => setFormData({...formData, type_pro: e.target.value})}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
                    >
                      <option value="Appartement">Appartement</option>
                      <option value="Villa">Villa</option>
                      <option value="Maison">Maison</option>
                      <option value="Studio">Studio</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Terrain">Terrain</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Surface (m²) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="surface"
                      value={formData.surface}
                      onChange={(e) => setFormData({...formData, surface: e.target.value})}
                      required
                      min="1"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm"
                      placeholder="Ex: 120"
                    />
                  </div>
                </div>
                
                {/* Chambres et Prix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nombre de chambres <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="chamber"
                      value={formData.chamber}
                      onChange={(e) => setFormData({...formData, chamber: e.target.value})}
                      required
                      min="1"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm"
                      placeholder="Ex: 3"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Prix (DH) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="prix"
                      value={formData.prix}
                      onChange={(e) => setFormData({...formData, prix: e.target.value})}
                      required
                      min="1"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm"
                      placeholder="Ex: 1200000"
                    />
                  </div>
                </div>
                
                {/* Ville et Code postal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Ville <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="ville"
                      value={formData.ville}
                      onChange={(e) => setFormData({...formData, ville: e.target.value})}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm"
                      placeholder="Ex: Casablanca"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Code postal <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="code_ville"
                      value={formData.code_ville}
                      onChange={(e) => setFormData({...formData, code_ville: e.target.value})}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm"
                      placeholder="Ex: 20000"
                    />
                  </div>
                </div>
                
                {/* Quartier */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Quartier <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="quartie"
                    value={formData.quartie}
                    onChange={(e) => setFormData({...formData, quartie: e.target.value})}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm"
                    placeholder="Ex: Anfa"
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm resize-none"
                    placeholder="Décrivez la propriété..."
                  />
                </div>
              </div>
              
              {/* Boutons du formulaire */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm hover:shadow transition-all flex items-center gap-2 text-sm"
                >
                  {editingId ? (
                    <>
                      <Edit2 className="w-4 h-4" />
                      Mettre à jour
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Ajouter la propriété
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}