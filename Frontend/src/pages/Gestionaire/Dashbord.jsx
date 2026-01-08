import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  HomeIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentTextIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('week');

  // Données pour le graphique des ventes
  const salesData = [
    { name: 'Jan', ventes: 65, locations: 45 },
    { name: 'Fév', ventes: 78, locations: 52 },
    { name: 'Mar', ventes: 90, locations: 61 },
    { name: 'Avr', ventes: 81, locations: 55 },
    { name: 'Mai', ventes: 102, locations: 68 },
    { name: 'Juin', ventes: 120, locations: 75 },
  ];

  // Données pour le graphique de performance
  const performanceData = [
    { name: 'Marie D.', value: 25, color: '#4F46E5' },
    { name: 'Pierre L.', value: 20, color: '#10B981' },
    { name: 'Sophie M.', value: 18, color: '#F59E0B' },
    { name: 'Thomas R.', value: 15, color: '#EF4444' },
    { name: 'Autres', value: 22, color: '#6B7280' },
  ];

  // Statistiques principales
  const statsCards = [
    {
      title: 'Chiffre d\'affaires',
      value: '€245,890',
      change: '+12.5%',
      isPositive: true,
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
      detail: 'Ce mois'
    },
    {
      title: 'Biens gérés',
      value: '342',
      change: '+8.2%',
      isPositive: true,
      icon: HomeIcon,
      color: 'bg-blue-500',
      detail: 'Actuellement'
    },
    {
      title: 'Clients actifs',
      value: '156',
      change: '+15.3%',
      isPositive: true,
      icon: UserGroupIcon,
      color: 'bg-purple-500',
      detail: 'Ce trimestre'
    },
    {
      title: 'Taux d\'occupation',
      value: '94.2%',
      change: '+2.1%',
      isPositive: true,
      icon: ChartBarIcon,
      color: 'bg-yellow-500',
      detail: 'Moyenne mensuelle'
    },
  ];

  // Transactions récentes
  const recentTransactions = [
    {
      id: 1,
      client: 'Martin Dupont',
      type: 'Vente',
      montant: '€450,000',
      date: '15 Nov 2024',
      status: 'completed',
      bien: 'Appartement T3 - Paris 15e'
    },
    {
      id: 2,
      client: 'Agence Horizon',
      type: 'Location',
      montant: '€2,400/mois',
      date: '14 Nov 2024',
      status: 'pending',
      bien: 'Maison - Versailles'
    },
    {
      id: 3,
      client: 'Sophie Bernard',
      type: 'Vente',
      montant: '€320,000',
      date: '13 Nov 2024',
      status: 'completed',
      bien: 'Studio - Paris 10e'
    },
    {
      id: 4,
      client: 'Jean Moreau',
      type: 'Location',
      montant: '€1,800/mois',
      date: '12 Nov 2024',
      status: 'failed',
      bien: 'Appartement T2 - Montreuil'
    },
  ];

  // Tâches en attente
  const pendingTasks = [
    { id: 1, title: 'Revue des contrats Q4', priority: 'high', deadline: 'Aujourd\'hui' },
    { id: 2, title: 'Réunion équipe commerciale', priority: 'medium', deadline: 'Demain' },
    { id: 3, title: 'Analyse marché immobilier', priority: 'low', deadline: '25 Nov' },
    { id: 4, title: 'Mise à jour des tarifs', priority: 'medium', deadline: '28 Nov' },
  ];

  // Agences performantes
  const topAgencies = [
    { name: 'Paris Centre', ventes: 42, croissance: '+18%' },
    { name: 'Lyon Part-Dieu', ventes: 38, croissance: '+12%' },
    { name: 'Marseille Vieux-Port', ventes: 35, croissance: '+8%' },
    { name: 'Bordeaux Centre', ventes: 31, croissance: '+15%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-600 mt-1">Bienvenue, Gestionnaire. Voici votre vue d'ensemble.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <BellIcon className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">GM</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Gestionnaire</p>
                  <p className="text-sm text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div className="flex space-x-4 mt-6">
            {['day', 'week', 'month', 'quarter', 'year'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter === 'day' ? 'Aujourd\'hui' : 
                 filter === 'week' ? 'Cette semaine' : 
                 filter === 'month' ? 'Ce mois' : 
                 filter === 'quarter' ? 'Ce trimestre' : 
                 'Cette année'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="p-8">
        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                  <div className="flex items-center mt-2">
                    {card.isPositive ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${card.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {card.change}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">{card.detail}</span>
                  </div>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Graphique des ventes */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Performances des ventes</h2>
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                <option>6 derniers mois</option>
                <option>Cette année</option>
                <option>Année dernière</option>
              </select>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    formatter={(value) => [`${value} transactions`, '']}
                    labelStyle={{ color: '#333' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="ventes" 
                    stroke="#4F46E5" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="locations" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance des agents */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Performance des agents</h2>
              <span className="text-sm text-gray-500">Top 5</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} transactions`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {performanceData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section inférieure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transactions récentes */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Transactions récentes</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                Voir tout <ChevronRightIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm border-b">
                    <th className="pb-3 font-medium">Client / Agence</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Montant</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Statut</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">{transaction.client}</p>
                          <p className="text-sm text-gray-500">{transaction.bien}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'Vente' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-4 font-medium text-gray-900">{transaction.montant}</td>
                      <td className="py-4 text-gray-500">{transaction.date}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status === 'completed' && <CheckCircleIcon className="h-3 w-3 mr-1" />}
                          {transaction.status === 'pending' && <ClockIcon className="h-3 w-3 mr-1" />}
                          {transaction.status === 'failed' && <XCircleIcon className="h-3 w-3 mr-1" />}
                          {transaction.status === 'completed' ? 'Complété' : 
                           transaction.status === 'pending' ? 'En attente' : 'Échoué'}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Détails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tâches et agences */}
          <div className="space-y-8">
            {/* Tâches en attente */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Tâches en attente</h2>
                <span className="text-sm text-gray-500">{pendingTasks.length} tâches</span>
              </div>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-800'
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {task.priority === 'high' ? 'Haute' : 
                           task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                        </span>
                        <span className="text-xs text-gray-500 ml-3 flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {task.deadline}
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2 border-t border-gray-100">
                Ajouter une tâche
              </button>
            </div>

            {/* Agences performantes */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Agences performantes</h2>
                <BuildingOfficeIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="space-y-4">
                {topAgencies.map((agency, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{agency.name}</p>
                      <p className="text-sm text-gray-500">{agency.ventes} transactions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{agency.croissance}</p>
                      <p className="text-sm text-gray-500">Croissance</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition-colors">
              <DocumentTextIcon className="h-5 w-5" />
              <span>Générer rapport</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium transition-colors">
              <UserGroupIcon className="h-5 w-5" />
              <span>Ajouter client</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-medium transition-colors">
              <HomeIcon className="h-5 w-5" />
              <span>Nouveau bien</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-yellow-700 font-medium transition-colors">
              <CogIcon className="h-5 w-5" />
              <span>Paramètres</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}