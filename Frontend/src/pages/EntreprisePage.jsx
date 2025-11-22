import React from 'react'
import NavBarApp from '../Components/NavBarApp'
import Footer from '../Components/Fotter'


import { Link } from 'react-router-dom'

export default function EntreprisePage() {
  const features = [
    {
      title: "Dashboard Centralisé",
      description: "Visualisez toutes vos activités en temps réel avec notre interface intuitive",
      items: ["Vue d'ensemble des performances", "Alertes et notifications", "Statistiques en direct"]
    },
    {
      title: "Gestion des Clients",
      description: "Suivez et gérez l'ensemble de votre portefeuille clients",
      items: ["Fiches clients détaillées", "Historique des interactions", "Segmentations avancées"]
    },
    {
      title: "Communication Multi-canal",
      description: "Communiquez efficacement via tous les canaux préférés de vos clients",
      items: ["Email intégré", "Messagerie instantanée", "SMS automatisés"]
    }
  ]

  const businessStats = [
    { value: "+45%", label: "Efficacité commerciale" },
    { value: "-60%", label: "Temps de gestion" },
    { value: "+80%", label: "Satisfaction client" },
    { value: "24/7", label: "Disponibilité" }
  ]

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <NavBarApp />

      {/* Hero Section */}
      <section className="bg-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Gérez Votre Business <span className="text-blue-600">Immobilier</span> avec Sérénité
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Notre plateforme SaaS vous offre tous les outils pour optimiser votre communication client et développer votre activité immobilière.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={"/register/entreprise"}>
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
                    Démarrer Gratuitement
                    </button>
                </Link>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-300">
                  Voir la Démo
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-gray-200">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">Tableau de Bord - Immobilier Pro</div>
                </div>
                
                {/* Dashboard Preview */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-xs text-gray-600">Nouveaux Contacts</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-xs text-gray-600">Rendez-vous</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">3</div>
                      <div className="text-xs text-gray-600">Transactions</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Activité Récente</span>
                      <span className="text-xs text-gray-500">Aujourd'hui</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        "Nouveau message de Sophie M.",
                        "Rendez-vous confirmé - 15:00",
                        "Document signé - Villa Les Pins"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {businessStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Optimisez Votre Gestion Immobilière
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des outils puissants pour gérer efficacement votre activité et développer votre chiffre d'affaires
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-blue-300 transition duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Management Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Comment Notre Solution Transforme Votre Business
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Automatisation des Processus",
                    description: "Réduisez le temps passé sur les tâches répétitives et concentrez-vous sur votre cœur de métier"
                  },
                  {
                    title: "Analytics Avancés",
                    description: "Prenez des décisions éclairées grâce à des rapports détaillés sur vos performances"
                  },
                  {
                    title: "Collaboration d'Équipe",
                    description: "Travaillez efficacement avec vos collaborateurs sur une plateforme unique"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-2 mr-4 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-8">
              <div className="bg-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Résultats Typiques</h3>
                <div className="space-y-4">
                  {[
                    { metric: "Temps de réponse client", improvement: "Réduction de 75%" },
                    { metric: "Taux de conversion", improvement: "Augmentation de 40%" },
                    { metric: "Gestion administrative", improvement: "Réduction de 60%" },
                    { metric: "Satisfaction client", improvement: "Score de 4.8/5" }
                  ].map((result, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-600">
                      <span className="text-gray-300">{result.metric}</span>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {result.improvement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à Booster Votre Business Immobilier ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les professionnels qui ont déjà transformé leur façon de travailler
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 shadow-lg">
              Essai Gratuit 30 Jours
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition duration-300">
              Discuter avec un Expert
            </button>
          </div>
          <p className="text-blue-200 mt-6 text-sm">
            Aucune carte de crédit requise • Configuration en 5 minutes • Support dédié
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}