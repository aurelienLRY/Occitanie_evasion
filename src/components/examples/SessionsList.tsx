'use client';

import { useActiveSessions } from '@/hooks/useQuery';
import type { Session } from '@/hooks/useQuery';

export default function SessionsList() {
  const { data: sessions, isLoading, error, refetch } = useActiveSessions();



  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Chargement des sessions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-600 mb-4">
          Erreur lors du chargement des sessions: {error.message}
        </div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!sessions || sessions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        Aucune session active disponible pour le moment.
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5); // Format HH:MM
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Sessions Actives ({sessions.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session: Session) => (
          <div
            key={session._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold">{session.activity.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(session.status)}`}>
                  {session.status}
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Date:</span>
                  <span className="text-sm font-medium">{formatDate(session.date)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Horaires:</span>
                  <span className="text-sm font-medium">
                    {formatTime(session.startTime)} - {formatTime(session.endTime)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Durée:</span>
                  <span className="text-sm font-medium">{session.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Formule:</span>
                  <span className="text-sm font-medium">{session.type_formule}</span>
                </div>
              </div>

              <div className="border-t pt-3 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Places:</span>
                  <span className="text-sm font-medium">
                    {session.placesReserved}/{session.placesMax}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(session.placesReserved / session.placesMax) * 100}%`
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-500">Spot:</span>
                  <span className="font-medium ml-1">{session.spot.name}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Description:</span>
                  <p className="text-gray-600 mt-1 line-clamp-2">{session.activity.description}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    {session.activity.price_half_day.standard}€
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Demi-journée
                  </span>
                </div>
                {session.activity.price_half_day.reduced > 0 && (
                  <p className="text-xs text-gray-500">
                    Tarif réduit: {session.activity.price_half_day.reduced}€
                  </p>
                )}
                {session.activity.price_half_day.ACM > 0 && (
                  <p className="text-xs text-gray-500">
                    ACM: {session.activity.price_half_day.ACM}€
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 