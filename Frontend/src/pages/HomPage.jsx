import React from 'react';
import { 
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  PlayCircleIcon,
  CheckBadgeIcon,
  HomeIcon,
  MapPinIcon,
  StarIcon
} from '@heroicons/react/24/outline';

import NavBarApp from '../Components/NavBarApp';
import Footer from '../Components/Fotter';

export default function HomePage() {
  const features = [
    {
      icon: CalendarDaysIcon,
      title: "Rendez-vous Intelligents",
      description: "Planifiez et gérez vos visites immobilières en quelques clics. Plus de double-booking, plus de conflits d'horaire.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Communication Centralisée",
      description: "Messagerie intégrée entre clients et agents. Échangez documents, photos et informations en temps réel.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: SparklesIcon,
      title: "AI Predictions",
      description: "Notre intelligence artificielle analyse le marché et prédit les tendances pour des décisions éclairées.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: ShieldCheckIcon,
      title: "Sécurité des Données",
      description: "Vos données sont cryptées et sécurisées. Conformité RGPD garantie pour une tranquillité d'esprit totale.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const stats = [
    { number: "10K+", label: "Biens Disponibles", icon: HomeIcon },
    { number: "500+", label: "Agences Partenaires", icon: BuildingStorefrontIcon },
    { number: "50K+", label: "Rendez-vous/mois", icon: CalendarDaysIcon },
    { number: "98%", label: "Satisfaction Clients", icon: StarIcon }
  ];

  const steps = [
    {
      step: "01",
      title: "Recherchez",
      description: "Trouvez le bien idéal avec notre moteur de recherche avancé",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      step: "02",
      title: "Planifiez",
      description: "Choisissez un créneau disponible et réservez en ligne",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      step: "03",
      title: "Visitez",
      description: "Rencontrez l'agent et découvrez le bien en personne",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      step: "04",
      title: "Finalisez",
      description: "Finalisez avec notre accompagnement personnalisé",
      image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const properties = [
    {
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      type: "Appartement",
      location: "Paris 16ème",
      price: "750,000 €"
    },
    {
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      type: "Villa",
      location: "Côte d'Azur",
      price: "1,200,000 €"
    },
    {
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      type: "Loft",
      location: "Lyon",
      price: "450,000 €"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavBarApp />
      
      {/* Hero Section avec image d'arrière-plan */}
      <section className="relative bg-gray-900 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Trouvez Votre
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Maison de Rêve
                </span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl">
                La plateforme immobilière intelligente qui connecte acheteurs, vendeurs et professionnels
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                  <HomeIcon className="h-5 w-5 mr-2" />
                  Explorer les Biens
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition duration-200 flex items-center justify-center">
                  <PlayCircleIcon className="h-5 w-5 mr-2" />
                  Voir la Démo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Maison moderne"
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Villa Moderne</h3>
                    <p className="text-gray-600 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      Nice, France
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">850,000 €</p>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                      Voir détails →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section améliorée */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section avec images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Une Expérience Immobilière Réinventée
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment nous transformons la recherche immobilière avec la technologie
            </p>
          </div>

          <div className="space-y-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className={`flex flex-col lg:flex-row gap-12 items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="lg:w-1/2">
                    <div className="relative">
                      <img 
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
                      />
                      <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl">
                        <Icon className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition duration-200">
                      En savoir plus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Properties Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Biens Exclusifs
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos propriétés sélectionnées avec soin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image}
                    alt={property.type}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Nouveau
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.type}</h3>
                  <p className="text-gray-600 flex items-center mb-4">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {property.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{property.price}</span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                      Visiter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section améliorée */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Simple et Efficace
            </h2>
            <p className="text-xl text-gray-600">
              Votre projet immobilier en 4 étapes simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto group-hover:scale-110 transition duration-300 shadow-lg">
                    {step.step}
                  </div>
                  <img 
                    src={step.image}
                    alt={step.title}
                    className="w-full h-48 object-cover rounded-2xl mt-6 shadow-lg group-hover:shadow-xl transition duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Prediction Section avec image */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                L'Intelligence Artificielle au Service de Votre Projet
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Notre technologie analyse des millions de données pour vous guider vers les meilleures décisions
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Analyse de marché en temps réel",
                  "Prédictions de valorisation précises",
                  "Recommandations personnalisées",
                  "Alertes opportunités exclusives"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-lg">
                    <CheckBadgeIcon className="h-6 w-6 text-green-400 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200 shadow-lg">
                Découvrir l'AI
              </button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="AI Analytics"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <ChartBarIcon className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="font-bold text-lg">+5.2%</div>
                    <div className="text-sm text-gray-600">Prédiction 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section finale */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Prêt à Commencer Votre Aventure Immobilière ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Rejoignez des milliers de personnes qui ont déjà trouvé leur bien idéal grâce à notre plateforme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-200 shadow-lg hover:shadow-xl text-lg">
              Commencer Gratuitement
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition duration-200 text-lg">
              Parler à un Expert
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}