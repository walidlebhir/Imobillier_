import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  HomeModernIcon,
  EyeIcon,
  HeartIcon,
  BuildingOfficeIcon,
  XMarkIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

export default function Hom() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedCity, setSelectedCity] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const properties = [
    {
      id: 1,
      title: "Appartement moderne centre-ville",
      type: "Appartement",
      price: 350000,
      location: "Paris 8ème",
      surface: 75,
      rooms: 3,
      bedrooms: 2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Bel appartement rénové avec vue dégagée",
      date: "2024-01-15",
      featured: true,
      rating: 4.8
    },
    {
      id: 2,
      title: "Villa contemporaine avec jardin",
      type: "Villa",
      price: 750000,
      location: "Neuilly-sur-Seine",
      surface: 150,
      rooms: 5,
      bedrooms: 4,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Villa moderne avec piscine et grand jardin",
      date: "2024-01-14",
      featured: true,
      rating: 4.9
    },
    {
      id: 3,
      title: "Studio étudiant proche université",
      type: "Studio",
      price: 180000,
      location: "Paris 5ème",
      surface: 25,
      rooms: 1,
      bedrooms: 1,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Studio fonctionnel parfait pour étudiant",
      date: "2024-01-13",
      featured: false,
      rating: 4.2
    },
    {
      id: 4,
      title: "Duplex avec terrasse panoramique",
      type: "Duplex",
      price: 520000,
      location: "Paris 16ème",
      surface: 95,
      rooms: 4,
      bedrooms: 3,
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Duplex lumineux avec terrasse et vue exceptionnelle",
      date: "2024-01-12",
      featured: true,
      rating: 4.7
    },
    {
      id: 5,
      title: "Loft industriel authentique",
      type: "Loft",
      price: 620000,
      location: "Paris 11ème",
      surface: 110,
      rooms: 3,
      bedrooms: 2,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Loft spacieux avec charactère industriel préservé",
      date: "2024-01-11",
      featured: false,
      rating: 4.5
    },
    {
      id: 6,
      title: "Penthouse vue sur la Tour Eiffel",
      type: "Penthouse",
      price: 1200000,
      location: "Paris 7ème",
      surface: 180,
      rooms: 5,
      bedrooms: 3,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Exceptionnel penthouse avec vue imprenable",
      date: "2024-01-10",
      featured: true,
      rating: 5.0
    }
  ];

  const cities = [
    { id: 'all', name: 'Toutes villes' },
    { id: 'paris', name: 'Paris' },
    { id: 'lyon', name: 'Lyon' },
    { id: 'marseille', name: 'Marseille' },
    { id: 'neuilly', name: 'Neuilly' }
  ];

  const propertyTypesList = [
    { id: 'all', name: 'Tous types' },
    { id: 'appartement', name: 'Appartement' },
    { id: 'villa', name: 'Villa' },
    { id: 'studio', name: 'Studio' },
    { id: 'duplex', name: 'Duplex' }
  ];

  const sortOptions = [
    { id: 'newest', name: 'Plus récent' },
    { id: 'price-low', name: 'Prix croissant' },
    { id: 'price-high', name: 'Prix décroissant' },
    { id: 'surface', name: 'Surface' }
  ];

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || property.location.toLowerCase().includes(selectedCity);
    const matchesType = propertyType === 'all' || property.type.toLowerCase() === propertyType;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    return matchesSearch && matchesCity && matchesType && matchesPrice;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          

          {/* Barre de recherche et filtres sur une seule ligne */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              
              {/* Barre de recherche */}
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher une propriété..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filtre Ville */}
              <div className="w-full lg:w-48">
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>

              {/* Filtre Type */}
              <div className="w-full lg:w-48">
                <select 
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {propertyTypesList.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              {/* Filtre Tri */}
              <div className="w-full lg:w-48">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>

              {/* Bouton Filtres Avancés */}
              <button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
                  showAdvancedFilters 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Filtres</span>
              </button>

              {/* Contrôles d'affichage */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Filtres avancés */}
            {showAdvancedFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix maximum: {formatPrice(priceRange[1])}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2000000"
                      step="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0€</span>
                      <span>2M€</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Surface minimum
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Toute surface</option>
                      <option>50m²+</option>
                      <option>75m²+</option>
                      <option>100m²+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chambres
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Toutes</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          
        </div>
      </div>

      {/* Grid des propriétés */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProperties.map((property) => (
            <div key={property.id} className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
              viewMode === 'list' ? 'flex' : ''
            }`}>
              
              <div className={`relative ${
                viewMode === 'list' ? 'w-80 flex-shrink-0' : 'h-64'
              }`}>
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-gray-700">
                    {property.type}
                  </span>
                  {property.featured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                      Vedette
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 p-2 bg-white/95 rounded-xl hover:scale-110 transition-all duration-200 shadow-lg"
                >
                  <HeartIcon 
                    className={`h-5 w-5 ${
                      favorites.includes(property.id) 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-gray-600'
                    }`} 
                  />
                </button>
              </div>

              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {property.title}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPrice(property.price)}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPinIcon className="h-4 w-4" />
                  <span className="font-medium">{property.location}</span>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {property.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <HomeModernIcon className="h-4 w-4" />
                      <span>{property.bedrooms} chambres</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BuildingOfficeIcon className="h-4 w-4" />
                      <span>{property.rooms} pièces</span>
                    </div>
                    <div className="text-gray-700 font-medium">
                      {property.surface}m²
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold">
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 max-w-2xl mx-auto">
              <MagnifyingGlassIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Aucune propriété trouvée
              </h3>
              <p className="text-gray-600 mb-6">
                Aucun résultat ne correspond à vos critères de recherche.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCity('all');
                  setPropertyType('all');
                  setPriceRange([0, 2000000]);
                }}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}