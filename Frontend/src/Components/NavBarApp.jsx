import React, { useState, useEffect } from 'react';
import { 
  BuildingOfficeIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  BuildingStorefrontIcon,
  UserIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';


export default function NavBarApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  

  

  

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-200' 
        : 'bg-white/90 backdrop-blur-md border-b border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
              <BuildingOfficeIcon className="h-7 w-7 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                ImmoFinder
              </span>
            </Link>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => handleNavigation('/')}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                <HomeIcon className="h-4 w-4" />
                <span>Accueil</span>
              </button>
              <button
                onClick={() => handleNavigation('/business')}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                <BuildingStorefrontIcon className="h-4 w-4" />
                <span>Business</span>
              </button>
            </div>
          </div>

          {/* Auth Buttons Desktop avec Icônes */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to={"/login/page"}>
                <button
                
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50"
                >
                <UserIcon className="h-4 w-4" />
                <span>Login</span>
                </button>
            </Link>

            <Link to={"/Register/page"}>
                <button
                
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                >
                <UserPlusIcon className="h-4 w-4" />
                <span>Register</span>
                </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu avec Icônes */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-200">
              {/* Navigation Items Mobile */}
              <button
                onClick={() => handleNavigation('/')}
                className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 w-full text-left"
              >
                <HomeIcon className="h-5 w-5" />
                <span>Accueil</span>
              </button>
              <button
                onClick={() => handleNavigation('/business')}
                className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 w-full text-left"
              >
                <BuildingStorefrontIcon className="h-5 w-5" />
                <span>Business</span>
              </button>
              
              {/* Mobile Auth Buttons avec Icônes */}
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <button
                  
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 w-full text-left"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Login</span>
                </button>
                

                <Link to="/Register/page">
                    <button
                    
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 w-full text-left"
                    >
                    <UserPlusIcon className="h-5 w-5" />
                    <span>Register</span>
                    </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}