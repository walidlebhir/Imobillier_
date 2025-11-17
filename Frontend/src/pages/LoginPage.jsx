import React, { useState } from 'react';
import { 
  EyeIcon,
  EyeSlashIcon,
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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
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
    // Logique de connexion
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
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                   Conexion
                  </h1>
                  
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="Votre mot de passe"
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

                  {/* Lien mot de passe oublié */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                        Se souvenir de moi
                      </label>
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                      Mot de passe oublié ?
                    </a>
                  </div>

                  {/* Bouton de connexion */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-semibold"
                  >
                    Se connecter
                  </button>

                  {/* Lien d'inscription */}
                  <div className="text-center pt-4">
                    <p className="text-gray-600">
                      Pas encore de compte ?{' '}
                      <Link to="/register" className="text-blue-600 hover:text-blue-500 font-semibold">
                        S'inscrire
                      </Link>
                    </p>
                  </div>

                  {/* Séparateur */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                    </div>
                  </div>

                  {/* Boutons de connexion sociale */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="ml-2">Google</span>
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                      <span className="ml-2">Twitter</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Image à droite - 50% */}
            <div className="hidden lg:block w-1/2">
              <div className="relative h-full min-h-[600px] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern real estate login"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay avec contenu */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">
                        Retrouvez vos biens favoris
                      </h2>
                      <p className="text-gray-200 text-lg">
                        Accédez à votre historique de recherche, vos favoris et vos alertes personnalisées
                      </p>
                    </div>

                    {/* Avantages */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckBadgeIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">Historique de recherche sauvegardé</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <ChartBarIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">Recommandations personnalisées</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <HomeIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">Alertes prix et nouveaux biens</span>
                      </div>
                    </div>

                    {/* Témoignage */}
                    <div className="mt-8 pt-6 border-t border-white/20">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-semibold">JD</span>
                        </div>
                        <div>
                          <p className="text-gray-200 italic">
                            "Grâce à ImmoFinder, j'ai trouvé mon appartement idéal en 2 semaines seulement !"
                          </p>
                          <p className="text-gray-300 text-sm mt-1">- Jean Dupont, Paris</p>
                        </div>
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