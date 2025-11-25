import React, { useState } from 'react';
import { 
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { UseAuthStore } from '../../Store/AuthStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function NavBarClient() {
    const navigate = useNavigate() ; 
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  

  const {logout , user , chekAUthentication} = UseAuthStore() ; 

  useEffect(()=>{
    chekAUthentication(); 
  },[]); 


  


  const HandelDeconexion = ()=>{
    const resulatat = logout() ; 
    if(resulatat){
        navigate("/login/page")
        toast.success("deconexion effectue avec succes ") ; 
    }
  }

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  }

  const navigationItems = [
    { name: "Dashboard", to: "/dashbord/client", icon: ChartBarIcon },
    { name: "Abonnement", to: "/subscription", icon: CreditCardIcon }
  ];

  return (
    <nav className="bg-gray-900 shadow-lg border-b border-gray-700 fixed w-full top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo et Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link to={"/clien/hom"}>
                <div className="flex items-center space-x-3">
                <span className="text-xl font-bold text-white">ImmoPro</span>
                </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group border border-transparent hover:border-gray-600"
                >
                  <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 hover:bg-gray-700 rounded-xl px-4 py-2 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center border border-gray-600">
                  <span className="text-xs font-semibold text-white">
                    {getInitials(user?.Nom || null)}
                  </span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-white">{user?.Nom }</p>
                  <p className="text-xs text-gray-400"></p>
                </div>
              </div>
              <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isProfileOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl shadow-lg border border-gray-700 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border border-gray-600">
                      <span className="text-sm font-semibold text-white">
                        {getInitials(user?.Nom)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">En ligne</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Menu Items */}
                <div className="py-2">
                  <Link 
                    to="/dashbord/client"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 group"
                  >
                    <ChartBarIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 group"
                  >
                    <UserCircleIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                    <span>Mon Profil</span>
                  </Link>
                  <Link 
                    to="/subscription"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 group"
                  >
                    <CreditCardIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                    <span>Abonnement</span>
                  </Link>
                  
                  <div className="border-t border-gray-700 my-2"></div>
                  
                  <button 
                    onClick={()=>HandelDeconexion()}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700 transition-all duration-200 group"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-700">
          <div className="flex justify-around py-3">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay pour fermer le menu */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </nav>
  );
}