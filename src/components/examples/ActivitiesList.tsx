'use client';

import { useActivities  } from '@/hooks/useQuery';
import { IActivityDetails } from '@/types';

export default function ActivitiesList() {
  const { data: activities, isLoading, error, refetch } = useActivities();


  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Chargement des activités...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-600 mb-4">
          Erreur lors du chargement des activités: {error.message}
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

  if (!activities || activities.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        Aucune activité disponible pour le moment.
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Nos Activités ({activities.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity: IActivityDetails) => (
          <div
            key={activity._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{activity.name}</h3>
              <p className="text-gray-600 mb-3 line-clamp-3">{activity.description}</p>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Âge minimum:</span>
                  <span className="text-sm font-medium">{activity.min_age} ans</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Participants:</span>
                  <span className="text-sm font-medium">{activity.min_OfPeople}-{activity.max_OfPeople}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Durée:</span>
                  <span className="text-sm font-medium">{activity.duration.half || activity.duration.full}</span>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Demi-journée:</span>
                  <span className="text-sm font-medium">{activity.half_day ? 'Oui' : 'Non'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Journée complète:</span>
                  <span className="text-sm font-medium">{activity.full_day ? 'Oui' : 'Non'}</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-blue-600">
                    {activity.price_half_day.standard}€
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Demi-journée
                  </span>
                </div>
                {activity.price_half_day.reduced > 0 && (
                  <p className="text-xs text-gray-500">
                    Tarif réduit: {activity.price_half_day.reduced}€
                  </p>
                )}
                {activity.price_half_day.ACM > 0 && (
                  <p className="text-xs text-gray-500">
                    ACM: {activity.price_half_day.ACM}€
                  </p>
                )}
              </div>

              {activity.required_equipment && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500">
                    <strong>Équipement requis:</strong> {activity.required_equipment}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 