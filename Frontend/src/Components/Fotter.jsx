import React from 'react';
import { 
  BuildingOfficeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Explorer',
      links: [
        { name: 'Appartements', href: '#' },
        { name: 'Maisons', href: '#' },
        { name: 'Locaux commerciaux', href: '#' },
        { name: 'Terrains', href: '#' },
        { name: 'Biens de luxe', href: '#' }
      ]
    },
    {
      title: 'Entreprise',
      links: [
        { name: 'À propos', href: '#' },
        { name: 'Nos agences', href: '#' },
        { name: 'Carrières', href: '#' },
        { name: 'Espace Professionnel', href: '#' },
        { name: 'Partenariats', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Centre d\'aide', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Conditions d\'utilisation', href: '#' },
        { name: 'Politique de confidentialité', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'LinkedIn', href: '#', icon: '💼' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ImmoFinder
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Votre partenaire de confiance pour trouver la propriété de vos rêves. 
              Des milliers de biens immobiliers sélectionnés avec soin pour vous.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPinIcon className="h-5 w-5 text-blue-400 mr-3" />
                <span>123 Avenue des Champs, 75008 Paris</span>
              </div>
              <div className="flex items-center text-gray-300">
                <PhoneIcon className="h-5 w-5 text-blue-400 mr-3" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center text-gray-300">
                <EnvelopeIcon className="h-5 w-5 text-blue-400 mr-3" />
                <span>contact@immofinder.fr</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition duration-200 hover:translate-x-1 transform flex items-center"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Restez informé</h3>
              <p className="text-gray-300">Recevez les dernières offres exclusives</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 flex-grow min-w-0"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-gray-400 hover:text-white transition duration-200 transform hover:scale-110 p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                title={social.name}
              >
                <span className="text-lg">{social.icon}</span>
              </a>
            ))}
          </div>
          
          <div className="flex items-center text-gray-400">
            <GlobeAltIcon className="h-5 w-5 mr-2" />
            <span>Français</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 text-sm">
              <span>&copy; {currentYear} ImmoFinder. Tous droits réservés.</span>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="text-gray-400 text-sm flex items-center">
                Fait avec <HeartIcon className="h-4 w-4 text-red-400 mx-1" /> pour l'immobilier
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}