import React, { useState } from 'react';
import { 
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  CreditCardIcon,
  BellIcon,
  EnvelopeIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { UseAuthStore } from '../../Store/AuthStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User } from 'lucide-react';

export default function NavbarManager() {

  const navigate = useNavigate(); 
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [messageCount, setMessageCount] = useState(5);

  const { logout , user, chekAUthentication } = UseAuthStore(); 

  const HandelDeconexion =async () => {
    const resulatat =await logout(); 
    if (resulatat == true) {
      toast.success("Déconnexion effectuée avec succès"); 
      navigate("/login/page");
    }else{
      navigate("/") ; 
    }
  };

  useEffect(() => {
    chekAUthentication(); 
  }, []);

  

  const navigationItems = [
    // Vos liens de navigation existants
  ];

  // Données fictives pour les notifications
  const notifications = [
    { id: 1, title: "Nouveau message", description: "Vous avez reçu un message de Jean Dupont", time: "5 min", read: false },
    { id: 2, title: "Rappel de rendez-vous", description: "Rendez-vous demain à 14h", time: "1h", read: false },
    { id: 3, title: "Mise à jour système", description: "Nouvelle mise à jour disponible", time: "2h", read: true },
  ];

  // Données fictives pour les messages
  const messages = [
    { id: 1, sender: "Marie Martin", preview: "Bonjour, concernant le dossier...", time: "10 min", unread: true },
    { id: 2, sender: "Agence Immobilière", preview: "Votre demande a été approuvée", time: "1h", unread: true },
    { id: 3, sender: "Support Technique", preview: "Réponse à votre ticket", time: "3h", unread: false },
  ];

  const clearAllNotifications = () => {
    setNotificationCount(0);
    toast.success("Notifications effacées");
  };

  const markAllAsRead = () => {
    setNotificationCount(0);
    toast.success("Toutes les notifications marquées comme lues");
  };

  // split nom 
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  }

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

          {/* Icons et Profile Menu */}
          <div className="flex items-center space-x-4">
            
            {/* Bouton Messages */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsMessagesOpen(!isMessagesOpen);
                  setIsNotificationsOpen(false);
                }}
                className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <EnvelopeIcon className="h-5 w-5" />
               
                  
                
              </button>

              {/* Dropdown Messages */}
              {isMessagesOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-xl shadow-lg border border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-white">Messages</h3>
                    <Link 
                      to="/messages"
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Voir tout
                    </Link>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {messages.map((message) => (
                      <Link
                        key={message.id}
                        to={`/messages/${message.id}`}
                        className="flex items-start space-x-3 px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-white">
                            {message.sender.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className={`text-sm font-medium ${message.unread ? 'text-white' : 'text-gray-300'}`}>
                              {message.sender}
                            </p>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <p className="text-xs text-gray-400 truncate mt-1">{message.preview}</p>
                        </div>
                        {message.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                      </Link>
                    ))}
                  </div>

                  <div className="px-4 py-3 border-t border-gray-700">
                    <Link 
                      to="/messages"
                      className="block text-center text-sm text-blue-400 hover:text-blue-300 py-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      Voir tous les messages
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Bouton Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsMessagesOpen(false);
                }}
                className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <BellIcon className="h-5 w-5" />
               
              </button>

              {/* Dropdown Notifications */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-xl shadow-lg border border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Tout marquer comme lu
                      </button>
                      <button 
                        onClick={clearAllNotifications}
                        className="text-xs  hover:text-red-300 ml-2"
                      >
                        Tout effacer
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0 transition-colors duration-200 cursor-pointer ${
                          !notification.read ? 'bg-gray-750' : ''
                        }`}
                        onClick={() => {
                          // Gérer le clic sur la notification
                          toast.success(`Notification: ${notification.title}`);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{notification.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-3 border-t border-gray-700">
                    <Link 
                      to="/notifications"
                      className="block text-center text-sm text-blue-400 hover:text-blue-300 py-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      Voir toutes les notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Bouton Paramètres (optionnel) */}
            <Link
              to="/settings"
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 hidden md:block"
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </Link>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                  setIsMessagesOpen(false);
                }}
                className="flex items-center space-x-3 hover:bg-gray-700 rounded-xl px-4 py-2 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center border border-gray-600">
                    <span className="text-xs font-semibold text-white">
                      {getInitials(user?.Nom)}
                    </span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-white">{""}</p>
                    <p className="text-xs text-gray-400"></p>
                  </div>
                </div>
                <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isProfileOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Menu Profile */}
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
                        <p className="text-sm font-semibold text-white truncate">{user.Nom}</p>
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
                      onClick={() => HandelDeconexion()}
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

      {/* Overlay pour fermer les menus */}
      {(isProfileOpen || isNotificationsOpen || isMessagesOpen) && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationsOpen(false);
            setIsMessagesOpen(false);
          }}
        ></div>
      )}
    </nav>
  );
}