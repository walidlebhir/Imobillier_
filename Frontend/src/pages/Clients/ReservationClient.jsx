import React, { useState } from 'react';
import { 
  FiCalendar, 
  FiSearch, 
  FiFilter,
  FiX,
  FiEye,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiDownload
} from 'react-icons/fi';

export default function ReservationClient() {
  const [reservations, setReservations] = useState([
    {
      id: 'RES-001',
      proprietaire: 'Marie Laurent',
      email: 'marie.laurent@email.com',
      telephone: '+33 6 12 34 56 78',
      bien: 'Appartement Paris 16ème',
      dateReservation: '2024-12-15',
      dateDebut: '2024-12-20',
      dateFin: '2024-12-27',
      prix: '€1,200',
      status: 'confirmée',
      dateCreation: '2024-11-10'
    },
    {
      id: 'RES-002',
      proprietaire: 'Pierre Martin',
      email: 'pierre.martin@email.com',
      telephone: '+33 6 23 45 67 89',
      bien: 'Villa Côte d\'Azur',
      dateReservation: '2024-12-18',
      dateDebut: '2025-01-05',
      dateFin: '2025-01-12',
      prix: '€2,500',
      status: 'en_attente',
      dateCreation: '2024-11-15'
    },
    {
      id: 'RES-003',
      proprietaire: 'Sophie Bernard',
      email: 'sophie.bernard@email.com',
      telephone: '+33 6 34 56 78 90',
      bien: 'Studio Lyon Centre',
      dateReservation: '2024-12-20',
      dateDebut: '2024-12-22',
      dateFin: '2024-12-29',
      prix: '€850',
      status: 'confirmée',
      dateCreation: '2024-11-18'
    },
    {
      id: 'RES-004',
      proprietaire: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      telephone: '+33 6 45 67 89 01',
      bien: 'Maison Bordeaux',
      dateReservation: '2024-12-22',
      dateDebut: '2025-01-10',
      dateFin: '2025-01-20',
      prix: '€1,800',
      status: 'annulée',
      dateCreation: '2024-11-20'
    },
    {
      id: 'RES-005',
      proprietaire: 'Alice Moreau',
      email: 'alice.moreau@email.com',
      telephone: '+33 6 56 78 90 12',
      bien: 'Chambre d\'hôte Provence',
      dateReservation: '2024-12-25',
      dateDebut: '2025-02-01',
      dateFin: '2025-02-08',
      prix: '€600',
      status: 'confirmée',
      dateCreation: '2024-11-25'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Filtrage des réservations
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.proprietaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.bien.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'tous' || reservation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservations = filteredReservations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

  // Fonction pour annuler une réservation
  const annulerReservation = (id) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: 'annulée' } : res
    ));
    setShowDeleteModal(false);
  };

  // Fonction pour obtenir les classes de statut
  const getStatusClasses = (status) => {
    const classes = {
      confirmée: 'bg-green-100 text-green-800 border-green-200',
      en_attente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      annulée: 'bg-red-100 text-red-800 border-red-200',
      terminee: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return classes[status] || classes.en_attente;
  };

  // Fonction pour obtenir le texte du statut
  const getStatusText = (status) => {
    const texts = {
      confirmée: 'Confirmée',
      en_attente: 'En attente',
      annulée: 'Annulée',
      terminee: 'Terminée'
    };
    return texts[status] || status;
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Réservations</h1>
          <p className="text-gray-600 mt-2">
            {filteredReservations.length} réservation(s) trouvée(s)
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <FiCalendar className="h-4 w-4" />
            <span>Nouvelle Réservation</span>
          </button>
          <button className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            <FiDownload className="h-4 w-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Filtres et Recherche */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Barre de recherche */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher par ID, propriétaire, bien..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filtre par statut */}
          <div className="flex space-x-2">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="tous">Tous les statuts</option>
              <option value="confirmée">Confirmées</option>
              <option value="en_attente">En attente</option>
              <option value="annulée">Annulées</option>
            </select>
            
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <FiFilter className="h-4 w-4" />
              <span>Plus de filtres</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tableau des réservations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID Réservation
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Propriétaire
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Bien
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date Réservation
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{reservation.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{reservation.proprietaire}</div>
                      <div className="text-sm text-gray-500">{reservation.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{reservation.bien}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(reservation.dateReservation).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{reservation.prix}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusClasses(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                        title="Voir les détails"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                      
                      {reservation.status !== 'annulée' && (
                        <button 
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                          title="Annuler la réservation"
                          onClick={() => {
                            setSelectedReservation(reservation);
                            setShowDeleteModal(true);
                          }}
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page {currentPage} sur {totalPages} • 
                {filteredReservations.length} résultat(s)
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <FiChevronLeft className="h-4 w-4" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <FiChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmation d'annulation */}
      {showDeleteModal && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FiX className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Annuler la réservation</h3>
                <p className="text-sm text-gray-600">Êtes-vous sûr de vouloir annuler cette réservation ?</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm">
                <div className="font-medium">{selectedReservation.id}</div>
                <div className="text-gray-600">{selectedReservation.proprietaire}</div>
                <div className="text-gray-600">{selectedReservation.bien}</div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Retour
              </button>
              <button
                onClick={() => annulerReservation(selectedReservation.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirmer l'annulation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}