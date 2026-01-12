import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { 
  
  FiPieChart, 
  FiSettings, 
  FiCalendar, 
  FiHeart,
  FiTrendingUp,
  FiCpu, 
  FiHome,

  FiUsers
} from 'react-icons/fi';

import { KeyRound } from "lucide-react";

export default function SidebareManger() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: <FiHome size={20} />, 
    path: "/entreprise/dashbord" 
  },
  { 
    id: 'Proprietaire', 
    label: 'propritaire', 
    icon: <KeyRound size={20} />, 
    path: "/propritaire" 
  },

  { 
    id: 'reservation', 
    label: 'Reservation', 
    icon: <FiCalendar size={20} />, 
    path: "/reservation/entreprise" 
  },

  { 
    id: 'prediction', 
    label: 'AI Prediction', 
    icon: <FiTrendingUp size={20} />, 
    path: "/prediction/ai" 
  },

  { 
    id: 'ai search', 
    label: 'AI search', 
    icon: <FiCpu size={20} />, 
    path: "/search/ai" 
  },

  { 
    id: 'planning', 
    label: 'Planning', 
    icon: <FiHeart size={20} />, 
    path: "/planning" 
  },
];

  return (
    <div className={`bg-white h-screen fixed left-0 top-0 flex flex-col transition-all duration-300
      ${isCollapsed ? 'w-16' : 'w-64'} z-30 border-r border-gray-200`}>

      {/* Header */}
      

      {/* Navigation */}
      <nav className="flex-1 py-8 px-2 mt-16 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map(item => (
  <li key={item.id}>
    <Link
      to={item.path}
      className={`w-full flex items-center rounded-lg p-2 transition-colors
        ${activeItem === item.id
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
      onClick={() => setActiveItem(item.id)}
    >
      <span className={`flex-shrink-0 ${activeItem === item.id ? 'text-blue-600' : 'text-gray-500'}`}>
        {item.icon}
      </span>
      {!isCollapsed && (
        <span className="ml-3 flex-1 text-left font-medium">
          {item.label}
        </span>
      )}
    </Link>
  </li>
))}
        </ul>
      </nav>

      {/* Footer: Paramètres et Déconnexion */}
      <div className="p-4 border-t border-gray-200 mt-auto space-y-2">
        <Link to="/Setting">
          <button className="w-full flex items-center rounded-lg p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <FiSettings size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="ml-3 flex-1 text-left font-medium">Paramètres</span>}
          </button>
        </Link>
        
        
       
      </div>
    </div>
  );
}