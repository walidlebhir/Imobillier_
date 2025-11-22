import React, { useState, useEffect } from 'react';
import { 
  BuildingOfficeIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  BuildingStorefrontIcon,
  UserIcon,
  UserPlusIcon,
  ChevronDownIcon,
  PhoneIcon,
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

export default function NavBarApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { 
      name: 'Accueil', 
      path: '/', 
      icon: HomeIcon 
    },
    { 
      name: 'Properties', 
      path: '/espace/entreprise', 
      icon: BuildingStorefrontIcon 
    },
    { 
      name: 'Solutions', 
      path: '/solutions',
      icon: ChartBarSquareIcon,
      dropdown: [
        { name: 'AI Pricing', path: '/solutions/ai-pricing' },
        { name: 'Market Analytics', path: '/solutions/analytics' },
        { name: 'Client Matching', path: '/solutions/matching' }
      ]
    },
    
    { 
      name: 'Contact', 
      path: '/contact', 
      icon: PhoneIcon 
    }
  ];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleDropdownEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo et Navigation */}
          <div className="flex items-center space-x-12">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer group">
              
              <span className="ml-3 text-2xl font-bold text-gray-900">
                ImmoFinder
              </span>
            </Link>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item, index) => (
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleDropdownEnter(index)}
                  onMouseLeave={item.dropdown ? handleDropdownLeave : undefined}
                >
                  {item.dropdown ? (
                    <div className="relative">
                      <button
                        className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold transition-all duration-200 rounded-xl 
                         
                        `}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === index && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 py-3 animate-in fade-in-0 zoom-in-95">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="flex items-center space-x-3 px-5 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span>{dropdownItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold transition-all duration-200 rounded-xl 
                        `}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Auth Buttons Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login/page">
              <button className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-xl hover:bg-gray-50">
                <UserIcon className="h-6 w-6 text-gray-700" /> Login
              </button>
            </Link>

            <Link to="/register/page">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                <UserPlusIcon className="h-6 w-6 text-white" />
                Signup
              </button>
            </Link>

          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden animate-in slide-in-from-top-4 duration-300">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 mt-2">
              {/* Navigation Items Mobile */}
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <button className="flex items-center space-x-3 w-full px-4 py-4 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-xl text-left">
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                        <ChevronDownIcon className="h-4 w-4 ml-auto" />
                      </button>
                      <div className="ml-8 space-y-2 border-l-2 border-gray-100 pl-4">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                          >
                            <span>{dropdownItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-4 text-base font-semibold transition-all duration-200 rounded-xl w-full ${
                        isActivePath(item.path)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Divider */}
              <div className="border-t border-gray-200 pt-4">
                {/* Mobile Auth Buttons */}
                <div className="space-y-3 px-2">
                  <Link to="/login/page" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full px-4 py-4 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-xl text-left">
                      <UserPlusIcon /> Connexion
                    </button>
                  </Link>

                  <Link to="/register/page" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full px-4 py-4 bg-gray-900  text-white text-base font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg text-center">
                      <UserIcon /> Commencer
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}