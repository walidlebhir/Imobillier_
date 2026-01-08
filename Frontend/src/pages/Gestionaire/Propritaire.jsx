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

  const {DataPropritaire , deleteOnePropritaire ,createpropritaire , getAllproprietaire } = PropritaireManageStore() ; 
  // Données initiales des propriétaires
  const initialProprietaires = DataPropritaire ; 
  // États
  const [proprietaires, setProprietaires] = useState(initialProprietaires);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');
  const [editingId, setEditingId] = useState(null);
  
  // État pour le formulaire
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

  

  // Types de propriétés
  const typesProprietes = ['Tous', 'Villa', 'Appartement', 'Maison', 'Studio', 'Commerce', 'Terrain'];

  // Filtrer les propriétaires
  const filteredProprietaires = DataPropritaire.filter(proprietaire => {
    const matchesSearch = 
      proprietaire.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proprietaire.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proprietaire.quartie.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'Tous' || proprietaire.type_pro === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Gérer le changement des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Réinitialiser le formulaire
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

  // Ouvrir le formulaire d'ajout
  const openAddForm = () => {
    resetForm();
    setShowAddForm(true);
  };

  // Ouvrir le formulaire d'édition
  const openEditForm = (proprietaire) => {
    setFormData({
      titre: proprietaire.titre,
      type_pro: proprietaire.type_pro,
      surface: proprietaire.surface,
      chamber: proprietaire.chamber,
      ville: proprietaire.ville,
      code_ville: proprietaire.code_ville,
      quartie: proprietaire.quartie,
      prix: proprietaire.prix.replace(/,/g, ''),
      description: proprietaire.description
    });
    setEditingId(proprietaire.id);
    setShowAddForm(true);
  };


  // Soumettre le formulaire (ajout ou modification)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Modification
      setProprietaires(prev => prev.map(p => 
        p.id === editingId 
          ? { 
              ...p, 
              ...formData, 
              prix: parseFloat(formData.prix).toLocaleString('fr-FR'),
              id: editingId,
              status: p.status // Conserver le statut
            } 
          : p
      ));
    } else {
      
      try {
        createpropritaire(formData) ; 
      } catch (error) {
        console.log("problemme "+error);
      }
      
    }
    
    // Fermer le formulaire et réinitialiser
    setShowAddForm(false);
    resetForm();
  };

  // Supprimer un propriétaire
  const handleDelete = (id) => {
    deleteOnePropritaire(id) ; 
    getAllproprietaire() ; 
  };

  // Obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'Loué': return 'bg-blue-100 text-blue-800';
      case 'Vendu': return 'bg-purple-100 text-purple-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Obtenir l'icône pour le type de propriété
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Villa': return <Home className="h-4 w-4" />;
      case 'Appartement': return <Building className="h-4 w-4" />;
      case 'Maison': return <Home className="h-4 w-4" />;
      case 'Studio': return <Building className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };


  useEffect(()=>{
    getAllproprietaire();
  }, []) 

  

  const [OpenUplode , SetOpenUplode ] = useState(false) ; 
  const [idPro , SetidPro] = useState(null) ; 
  // logique pour uploder des images 
  const handelOpenModal = (id_Pro)=>{
    SetOpenUplode(true) ; 
    SetidPro(id_Pro); 
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* En-tête */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Propriétés</h1>
            <p className="text-gray-600 mt-2">Gérez et suivez toutes vos propriétés immobilières</p>
          </div>
          
          <button
            onClick={openAddForm}
            className="mt-4 md:mt-0 flex items-center justify-center px-5 py-3 bg-gray-800  text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5 mr-2" />
            Ajouter une propriété
          </button>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Barre de recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher par titre, ville ou quartier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            
            {/* Filtre par type */}
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  {typesProprietes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 h-5 w-5" />
              </div>
            </div>
          </div>
          
          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total Propriétés</p>
              <p className="text-2xl font-bold text-gray-900">{DataPropritaire.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Disponibles</p>
              <p className="text-2xl font-bold text-gray-900">
                {DataPropritaire.filter(p => p.status === 'Disponible').length}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Loués</p>
              <p className="text-2xl font-bold text-gray-900">
                {DataPropritaire.filter(p => p.status === 'Loué').length}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Vendus</p>
              <p className="text-2xl font-bold text-gray-900">
                {DataPropritaire.filter(p => p.status === 'Vendu').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau des propriétaires */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Propriété
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Surface
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localisation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {DataPropritaire.length > 0 ? (
                DataPropritaire.map((proprietaire) => (
                  <tr key={proprietaire.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{proprietaire.titre}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{proprietaire.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-blue-600 mr-2">
                          {getTypeIcon(proprietaire.type_pro)}
                        </span>
                        <span className="text-sm text-gray-900">{proprietaire.type_pro}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{proprietaire.surface} m²</p>
                        <p className="text-xs text-gray-500">{proprietaire.chamber} chambre(s)</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center text-sm text-gray-900">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {proprietaire.ville}
                        </div>
                        <p className="text-xs text-gray-500">{proprietaire.quartie}, {proprietaire.code_ville}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-sm font-medium text-gray-900">{proprietaire.prix} DH</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => openEditForm(proprietaire)}
                          className="text-gray-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(proprietaire.id)}
                          className="text-gray-600-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Voir détails"
                        >
                          <Eye className="h-5 w-5" />
                        </button>

                        <button
                          className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Voir détails"
                          onClick={()=>handelOpenModal(proprietaire.id)}
                        >
                          <Upload className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">Aucune propriété trouvée</p>
                      <p className="mt-2">Essayez de modifier vos critères de recherche ou ajoutez une nouvelle propriété.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/**Model open pour Uploder des imges  */}
        <UploadImagesModal 
          id_pro={idPro} 
          isOpen={OpenUplode} 
          onClose={()=>SetOpenUplode(false)}
        />
        
        {/* Pagination (simplifiée) */}
        {filteredProprietaires.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Affichage de <span className="font-medium">{filteredProprietaires.length}</span> propriétés
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Précédent
                </button>
                <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700">
                  1
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Formulaire d'ajout/modification (sidebar) */}
      {showAddForm && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setShowAddForm(false)}
          />
          
          {/* Sidebar */}
          <div className={`fixed right-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${showAddForm ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col">
              {/* En-tête du formulaire */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="flex items-center justify-between">
                  
                </div>
              </div>
              
              {/* Corps du formulaire */}
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    {/* Titre */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titre de la propriété *
                      </label>
                      <input
                        type="text"
                        name="titre"
                        value={formData.titre}
                        onChange={(e)=>setFormData({...formData , titre:e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Ex: Villa moderne avec piscine"
                      />
                    </div>
                    
                    {/* Type et Surface */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type de propriété *
                        </label>
                        <select
                          name="type_pro"
                          value={formData.type_pro}
                          onChange={(e)=>setFormData({...formData , type_pro:e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Surface (m²) *
                        </label>
                        <input
                          type="number"
                          name="surface"
                          value={formData.surface}
                          onChange={(e)=>setFormData({...formData , surface:e.target.value})}
                          required
                          min="1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Ex: 120"
                        />
                      </div>
                    </div>
                    
                    {/* Chambres et Prix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre de chambres *
                        </label>
                        <input
                          type="number"
                          name="chamber"
                          value={formData.chamber}
                          onChange={(e)=>setFormData({...formData , chamber:e.target.value})}
                          required
                          min="1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Ex: 3"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prix (DH) *
                        </label>
                        <input
                          type="number"
                          name="prix"
                          value={formData.prix}
                          onChange={(e)=>setFormData({...formData , prix:e.target.value})}
                          required
                          min="1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Ex: 1200000"
                        />
                      </div>
                    </div>
                    
                    {/* Ville et Code postal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ville *
                        </label>
                        <input
                          type="text"
                          name="ville"
                          value={formData.ville}
                          onChange={(e)=>setFormData({...formData , ville:e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Ex: Casablanca"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Code postal *
                        </label>
                        <input
                          type="text"
                          name="code_ville"
                          value={formData.code_ville}
                          onChange={(e)=>setFormData({...formData , code_ville:e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Ex: 20000"
                        />
                      </div>
                    </div>
                    
                    {/* Quartier */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quartier *
                      </label>
                      <input
                        type="text"
                        name="quartie"
                        value={formData.quartie}
                        onChange={(e)=>setFormData({...formData , quartie:e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Ex: Anfa"
                      />
                    </div>
                    
                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={(e)=>setFormData({...formData , description:e.target.value})}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Décrivez la propriété..."
                      />
                    </div>
                  </div>
                  
                  {/* Boutons du formulaire */}
                  <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      onClick={()=>handleSubmit()}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 font-medium"
                    >
                      {editingId ? 'Mettre à jour' : 'Ajouter la propriété'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}