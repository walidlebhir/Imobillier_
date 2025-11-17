import React, { useState } from 'react';
import { 
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
  ChartBarIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import NavBarApp from '../Components/NavBarApp';
import Footer from '../Components/Fotter';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Logique d'inscription
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBarApp />
      
      {/* Main Content */}
      <div className="pt-20 pb-16 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start">
            
            {/* Formulaire à gauche - 50% */}
            <div className="w-full lg:w-1/2 lg:pr-12">
              <div className="max-w-md mx-auto lg:mx-0">
                {/* En-tête du formulaire */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    
                    
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Créer votre compte
                  </h1>
                  <p className="text-gray-600">
                    Commencez votre voyage immobilier avec nous
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom complet */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Mot de passe */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="Créez un mot de passe"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Checkbox Conditions */}
                  <div className="flex items-start space-x-3">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      J'accepte les{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                        conditions d'utilisation
                      </a>{' '}
                      et la{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                        politique de confidentialité
                      </a>
                    </label>
                  </div>

                  {/* Bouton d'inscription */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-semibold"
                  >
                    Créer mon compte
                  </button>

                  {/* Lien de connexion */}
                  <div className="text-center pt-4">
                    <p className="text-gray-600">
                      Déjà un compte ?{' '}
                      <Link to="/login" className="text-blue-600 hover:text-blue-500 font-semibold">
                        Se connecter
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Image à droite - 50% */}
            <div className="hidden lg:block w-1/2">
              <div className="relative h-full min-h-[600px] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern real estate"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay avec contenu */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">
                        La plateforme immobilière intelligente
                      </h2>
                      <p className="text-gray-200 text-lg">
                        Rejoignez des milliers de professionnels et particuliers qui révolutionnent leur expérience immobilière
                      </p>
                    </div>

                    {/* Avantages */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckBadgeIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">Recherche AI avancée</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <ChartBarIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">Analyses de marché en temps réel</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <HomeIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">Accès aux biens exclusifs</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-white/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold">10K+</div>
                        <div className="text-gray-300 text-sm">Utilisateurs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">50K+</div>
                        <div className="text-gray-300 text-sm">Biens</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">98%</div>
                        <div className="text-gray-300 text-sm">Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}