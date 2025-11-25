import React from 'react';
import { 
  FiCalendar, 
  FiHeart, 
  FiDollarSign, 
  FiUsers, 
  FiHome,
  FiTrendingUp,
  FiStar,
  FiBell
} from 'react-icons/fi';

import ChatBot from './AsistantAi';

export default function DashboardPage() {
  // Données statistiques
  const statsData = [
    {
      title: "Réservations Actives",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: <FiCalendar className="h-6 w-6" />,
      color: "blue"
    },
    {
      title: "Favoris",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: <FiHeart className="h-6 w-6" />,
      color: "pink"
    },
    {
      title: "Revenus Mensuels",
      value: "€4,250",
      change: "+15%",
      trend: "up",
      icon: <FiDollarSign className="h-6 w-6" />,
      color: "green"
    },
    {
      title: "Biens Gérés",
      value: "18",
      change: "+2",
      trend: "up",
      icon: <FiHome className="h-6 w-6" />,
      color: "purple"
    }
  ];

  // Réservations récentes
  const recentReservations = [
    {
      id: 1,
      property: "Appartement Paris 16ème",
      client: "Marie Laurent",
      date: "15 Déc 2024",
      status: "Confirmée",
      amount: "€1,200"
    },
    {
      id: 2,
      property: "Villa Côte d'Azur",
      client: "Pierre Martin",
      date: "18 Déc 2024",
      status: "En attente",
      amount: "€2,500"
    },
    {
      id: 3,
      property: "Studio Lyon Centre",
      client: "Sophie Bernard",
      date: "20 Déc 2024",
      status: "Confirmée",
      amount: "€850"
    }
  ];

  // Biens favoris
  const favoriteProperties = [
    {
      id: 1,
      title: "Appartement Moderne",
      location: "Paris 8ème",
      price: "€450,000",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300"
    },
    {
      id: 2,
      title: "Villa avec Piscine",
      location: "Nice",
      price: "€1,200,000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300"
    }
  ];

  // Fonctionnalités principales
  const features = [
    {
      title: "Gestion des Réservations",
      description: "Suivez et gérez toutes vos réservations en temps réel",
      icon: <FiCalendar className="h-8 w-8" />
    },
    {
      title: "Analytique Avancée",
      description: "Statistiques détaillées sur vos performances",
      icon: <FiTrendingUp className="h-8 w-8" />
    },
    {
      title: "Gestion des Favoris",
      description: "Suivez les biens les plus populaires",
      icon: <FiStar className="h-8 w-8" />
    },
    {
      title: "Alertes Intelligentes",
      description: "Notifications pour les opportunités importantes",
      icon: <FiBell className="h-8 w-8" />
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      pink: "bg-pink-50 text-pink-600 border-pink-200",
      green: "bg-green-50 text-green-600 border-green-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
          <p className="text-gray-600 mt-2">Bienvenue sur votre espace de gestion immobilière</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Nouvelle Réservation
          </button>
        </div>
      </div>

      {/* Cartes Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className={`flex items-center mt-2 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="text-sm font-medium">{stat.change}</span>
                  <span className="text-xs ml-1">ce mois</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Réservations Récentes */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Réservations Récentes</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            {recentReservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FiCalendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{reservation.property}</h3>
                    <p className="text-sm text-gray-600">{reservation.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{reservation.amount}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    reservation.status === 'Confirmée' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reservation.status}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{reservation.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/**Chat bootai  */} 
        <ChatBot />

        {/* Biens Favoris */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Biens Favoris</h2>
          <div className="space-y-4">
            {favoriteProperties.map((property) => (
              <div key={property.id} className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div 
                  className="h-32 bg-cover bg-center"
                  style={{ backgroundImage: `url(${property.image})` }}
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{property.title}</h3>
                    <div className="flex items-center space-x-1">
                      <FiStar className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{property.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                  <p className="font-bold text-gray-900">{property.price}</p>
                  <button className="w-full mt-3 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    Voir les détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fonctionnalités */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Fonctionnalités du Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-blue-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistiques Rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Taux d'occupation</p>
              <p className="text-2xl font-bold mt-1">78%</p>
            </div>
            <FiTrendingUp className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Satisfaction clients</p>
              <p className="text-2xl font-bold mt-1">4.7/5</p>
            </div>
            <FiStar className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Nouveaux clients</p>
              <p className="text-2xl font-bold mt-1">12</p>
            </div>
            <FiUsers className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>
    </div>
  );
}