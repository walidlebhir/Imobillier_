import React, { useState } from 'react';

export default function ReservationPage() {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      proprietaire: 'Mohamed Ali',
      nomClient: 'Ahmed Ben Salah',
      commentaire: 'Intéressé par l\'appartement F3',
      dateCreation: '2024-01-15',
      confirmee: false,
      dateVente: ''
    },
    {
      id: 2,
      proprietaire: 'Fatima Zohra',
      nomClient: 'Sara Trabelsi',
      commentaire: 'Visite prévue demain',
      dateCreation: '2024-01-16',
      confirmee: true,
      dateVente: '2024-01-20'
    },
    {
      id: 3,
      proprietaire: 'Khaled Ben Ammar',
      nomClient: 'Youssef Ghedira',
      commentaire: 'En attente de documents',
      dateCreation: '2024-01-17',
      confirmee: false,
      dateVente: ''
    }
  ]);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [dateVente, setDateVente] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'confirmed', 'pending'

  const filteredReservations = reservations.filter(res => {
    if (filter === 'confirmed') return res.confirmee;
    if (filter === 'pending') return !res.confirmee;
    return true;
  });

  const handleOpenConfirm = (reservation) => {
    setSelectedReservation(reservation);
    setShowConfirmPopup(true);
    setDateVente('');
  };

  const handleConfirm = () => {
    if (!dateVente) {
      alert('Veuillez saisir une date de vente');
      return;
    }

    setReservations(prev => prev.map(res => 
      res.id === selectedReservation.id 
        ? { ...res, confirmee: true, dateVente }
        : res
    ));

    setShowConfirmPopup(false);
    setSelectedReservation(null);
    setDateVente('');
  };

  const handleCancelReservation = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      setReservations(prev => prev.filter(res => res.id !== id));
    }
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Gestion des Réservations
        </h1>
        <p className="text-gray-600">
          Gérez et confirmez les réservations des clients
        </p>
      </div>

      {/* Filtres */}
      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            filter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Toutes ({reservations.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            filter === 'pending' 
              ? 'bg-yellow-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          En attente ({reservations.filter(r => !r.confirmee).length})
        </button>
        <button
          onClick={() => setFilter('confirmed')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            filter === 'confirmed' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Confirmées ({reservations.filter(r => r.confirmee).length})
        </button>
      </div>

      {/* Tableau des réservations */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Propriétaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commentaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Création
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.length > 0 ? (
                filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{reservation.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {reservation.proprietaire}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {reservation.nomClient}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                      <div className="truncate" title={reservation.commentaire}>
                        {reservation.commentaire}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {reservation.dateCreation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        reservation.confirmee 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {reservation.confirmee ? 'Confirmée' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        {!reservation.confirmee && (
                          <button
                            onClick={() => handleOpenConfirm(reservation)}
                            className="text-green-600 hover:text-green-900 font-medium"
                          >
                            Confirmer
                          </button>
                        )}
                        {reservation.confirmee && (
                          <span className="text-sm text-gray-500">
                            Vente: {reservation.dateVente}
                          </span>
                        )}
                        <button
                          onClick={() => handleCancelReservation(reservation.id)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Annuler
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    Aucune réservation trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup de confirmation */}
      {showConfirmPopup && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Confirmer la réservation
              </h3>
              <p className="text-gray-600 text-sm">
                Confirmez la réservation de <span className="font-medium">{selectedReservation.nomClient}</span> pour le propriétaire <span className="font-medium">{selectedReservation.proprietaire}</span>
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de vente prévue *
              </label>
              <input
                type="date"
                value={dateVente}
                onChange={(e) => setDateVente(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowConfirmPopup(false);
                  setSelectedReservation(null);
                  setDateVente('');
                }}
                className="px-4 py-2 text-gray-700 font-medium bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                Confirmer la vente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistiques */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Total Réservations</div>
          <div className="text-2xl font-bold text-blue-700">{reservations.length}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-sm text-yellow-600 font-medium">En attente</div>
          <div className="text-2xl font-bold text-yellow-700">
            {reservations.filter(r => !r.confirmee).length}
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-green-600 font-medium">Confirmées</div>
          <div className="text-2xl font-bold text-green-700">
            {reservations.filter(r => r.confirmee).length}
          </div>
        </div>
      </div>
    </div>
  );
}