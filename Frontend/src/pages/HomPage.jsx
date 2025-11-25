import React from 'react'
import NavBarApp from '../Components/NavBarApp' 
import Footer from '../Components/Fotter'

// Import des icônes Heroicons
import {
  // Hero Section
  CheckBadgeIcon,
  PlayCircleIcon,
  
  // AI Features Section
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  UserGroupIcon,
  
  // Communication Tools
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleBottomCenterTextIcon,
  
  // Analytics Section
  ArrowTrendingUpIcon,
  UserPlusIcon,
  ClockIcon,
  
  // Testimonials & General
  StarIcon,
  CheckIcon,
  RocketLaunchIcon,
  BuildingOfficeIcon,
  HomeModernIcon,
  MapPinIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid'

import {
  // Outline icons for variety
  BuildingStorefrontIcon,
  DevicePhoneMobileIcon,
  ChartBarSquareIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBarApp />
      
      {/* Hero Section */}
      <section className="bg-white text-gray-900 relative overflow-hidden pt-20 border-b border-gray-200">
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-full px-5 py-3 mb-8">
                <CheckBadgeIcon className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm font-semibold text-blue-700">Plateforme IA révolutionnaire</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-8 text-gray-900">
                Intelligence Immobilière
                <span className="text-blue-600"> 2.0</span>
              </h1>
              <p className="text-xl mb-8 text-gray-600 leading-relaxed">
                Connectez, communiquez et concluez avec notre suite d'outils IA 
                dédiée aux professionnels de l'immobilier et leurs clients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg">
                  <RocketLaunchIcon className="w-5 h-5" />
                  <span>Démarrer l'essai gratuit</span>
                </button>
                <button className="flex items-center justify-center space-x-3 border-2 border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                  <PlayCircleIcon className="w-5 h-5" />
                  <span>Voir la démo</span>
                </button>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <div className="flex -space-x-2 mr-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full border-2 border-white flex items-center justify-center">
                    <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-full border-2 border-white flex items-center justify-center">
                    <HomeModernIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-full border-2 border-white flex items-center justify-center">
                    <ShieldCheckIcon className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <span className="font-medium">Rejoignez 500+ agences qui nous font confiance</span>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80" 
                    alt="Dashboard IA immobilier"
                    className="rounded-xl w-full h-80 object-cover"
                  />
                </div>
                {/* Floating AI Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">Assistant IA</div>
                      <div className="text-xs text-gray-600">Prédictions précises</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50 border-b">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-500 text-sm mb-12 flex items-center justify-center">
            <ShieldCheckIcon className="w-5 h-5 mr-3" />
            <span className="font-semibold">Ils nous font confiance</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-70">
            {['Orpi', 'Century 21', 'Laforêt', 'Sotheby\'s', 'Barnes'].map((brand, index) => (
              <div key={index} className="text-xl font-semibold text-gray-700 flex items-center">
                <BuildingStorefrontIcon className="w-6 h-6 mr-3 text-blue-600" />
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Technologie IA Avancée
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils intelligents qui transforment votre façon de travailler 
              dans l'immobilier
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                {[
                  {
                    icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />,
                    title: 'Assistant IA Conversationnel',
                    desc: 'Chatbot intelligent qui répond aux questions des clients 24/7 et qualifie les leads automatiquement'
                  },
                  {
                    icon: <ChartBarIcon className="w-6 h-6 text-blue-600" />,
                    title: 'Prédiction de Prix IA',
                    desc: 'Estimation précise basée sur l\'analyse de millions de données du marché'
                  },
                  {
                    icon: <UserGroupIcon className="w-6 h-6 text-blue-600" />,
                    title: 'Matching Intelligent',
                    desc: 'Algorithmes qui connectent automatiquement acheteurs et biens pertinents'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex space-x-6 group hover:bg-blue-50 p-6 rounded-2xl transition-all duration-300">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Interface IA"
                className="rounded-xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Communication Tools */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Communication Unifiée
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tous vos canaux de communication centralisés en un seul endroit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />,
                title: 'Messagerie Intelligente',
                features: ['Chat en temps réel', 'Templates personnalisés', 'Réponses automatiques']
              },
              {
                icon: <PhoneIcon className="w-6 h-6" />,
                title: 'Centre d\'Appels Intégré',
                features: ['Appels VoIP', 'Enregistrement', 'Analytique des appels']
              },
              {
                icon: <EnvelopeIcon className="w-6 h-6" />,
                title: 'Email Automation',
                features: ['Campagnes automatiques', 'Suivi des leads', 'Analytics détaillés']
              }
            ].map((tool, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  {tool.title}
                </h3>
                <ul className="space-y-4">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-4" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics & Predictions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-8 flex items-center">
                  <ChartBarSquareIcon className="w-8 h-8 mr-4" />
                  Analytics en Temps Réel
                </h3>
                <div className="space-y-6">
                  {[
                    { 
                      icon: <ArrowTrendingUpIcon className="w-6 h-6 text-green-400" />,
                      label: 'Taux de conversion', 
                      value: '68%', 
                      trend: '+12%' 
                    },
                    { 
                      icon: <UserPlusIcon className="w-6 h-6 text-blue-400" />,
                      label: 'Leads qualifiés', 
                      value: '124', 
                      trend: '+8%' 
                    },
                    { 
                      icon: <ClockIcon className="w-6 h-6 text-yellow-400" />,
                      label: 'Temps de réponse moyen', 
                      value: '2.4min', 
                      trend: '-45%' 
                    }
                  ].map((metric, index) => (
                    <div key={index} className="flex justify-between items-center py-4 border-b border-blue-700/50">
                      <div className="flex items-center space-x-4">
                        {metric.icon}
                        <span className="font-medium">{metric.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{metric.value}</div>
                        <div className="text-sm text-green-400 font-medium">{metric.trend}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                Data & Prédictions
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Notre IA analyse les tendances du marché en temps réel et vous 
                fournit des insights actionnables pour optimiser vos stratégies.
              </p>
              <div className="space-y-5">
                {[
                  'Prédiction de demande par zone géographique',
                  'Recommandations de prix optimaux',
                  'Détection de leads chauds',
                  'Alertes marché personnalisées'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 group hover:bg-gray-50 p-4 rounded-xl transition-colors duration-200">
                    <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <CheckIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Fonctionnalités Complémentaires
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour exceller dans l'immobilier moderne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MapPinIcon className="w-8 h-8 text-blue-600" />,
                title: 'Géolocalisation Avancée',
                desc: 'Analyse des zones stratégiques'
              },
              {
                icon: <DevicePhoneMobileIcon className="w-8 h-8 text-green-600" />,
                title: 'Application Mobile',
                desc: 'Gestion depuis votre smartphone'
              },
              {
                icon: <HeartIcon className="w-8 h-8 text-red-600" />,
                title: 'Gestion des Favoris',
                desc: 'Suivi des biens préférés'
              },
              {
                icon: <ShieldCheckIcon className="w-8 h-8 text-purple-600" />,
                title: 'Sécurité Maximale',
                desc: 'Données cryptées et sécurisées'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Ils parlent de nous
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Lambert",
                company: "CEO, ImmoPro",
                text: "L'IA de prédiction a augmenté nos ventes de 40% en 3 mois.",
                avatar: "ML",
                rating: 5
              },
              {
                name: "Thomas Dubois",
                company: "Directeur, Elite Immobilier",
                text: "La communication unifiée a divisé notre temps de traitement par 2.",
                avatar: "TD",
                rating: 5
              },
              {
                name: "Sophie Martin",
                company: "Agent immobilier indépendant",
                text: "L'assistant IA répond à mes clients même quand je dors !",
                avatar: "SM",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center font-semibold text-blue-600 mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Prêt pour la révolution IA ?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Rejoignez l'avenir de l'immobilier avec notre plateforme tout-en-un 
            alimentée par l'intelligence artificielle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 mx-auto sm:mx-0">
              <RocketLaunchIcon className="w-5 h-5" />
              <span>Essai gratuit 30 jours</span>
            </button>
            <button className="flex items-center justify-center space-x-3 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 mx-auto sm:mx-0">
              <PlayCircleIcon className="w-5 h-5" />
              <span>Demander une démo</span>
            </button>
          </div>
          <div className="text-sm text-blue-200 flex items-center justify-center">
            <ShieldCheckIcon className="w-5 h-5 mr-3" />
            <span>Aucune carte de crédit requise • Configuration en 5 minutes</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}