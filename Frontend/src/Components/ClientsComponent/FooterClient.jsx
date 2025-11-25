import React from 'react';
import { 
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ShieldCheckIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

export default function FooterClient() {
  // Données utilisateur simulées
  const userData = {
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    company: "ImmoPro Consulting",
    plan: "Professionnel",
    subscription: "Mensuel",
    nextBilling: "15 Mars 2024"
  };

  const quickActions = [
    {
      icon: CogIcon,
      label: "Paramètres du compte",
      description: "Gérer vos préférences",
      color: "text-gray-600",
      hoverColor: "hover:text-blue-600"
    },
    {
      icon: DocumentTextIcon,
      label: "Documents & Factures",
      description: "Accéder à vos documents",
      color: "text-gray-600",
      hoverColor: "hover:text-green-600"
    },
    {
      icon: CreditCardIcon,
      label: "Abonnement",
      description: "Gérer votre forfait",
      color: "text-gray-600",
      hoverColor: "hover:text-purple-600"
    },
    {
      icon: QuestionMarkCircleIcon,
      label: "Centre d'aide",
      description: "Support et assistance",
      color: "text-gray-600",
      hoverColor: "hover:text-orange-600"
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Copyright et statut */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Système en ligne</span>
              </div>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-400">
                &copy; 2024 ImmoPro SaaS. Tous droits réservés.
              </span>
            </div>

            {/* Liens légaux */}
            <div className="flex items-center space-x-6">
              <button className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Confidentialité
              </button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Conditions d'utilisation
              </button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Sécurité
              </button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                API
              </button>
            </div>
          </div>
        </div>

        {/* Version et build */}
        <div className="mt-4 text-center">
          <span className="text-xs text-gray-500">
            v2.4.1 • Build #2842 • 
            <span className="text-green-400 ml-1">Tous les systèmes opérationnels</span>
          </span>
        </div>
      </div>

     
      
    
    </footer>
  );
}