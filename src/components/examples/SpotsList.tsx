'use client';

import { useSpots } from '@/hooks/useQuery';
import type { Spot } from '@/hooks/useQuery';
import Image from 'next/image';

export default function SpotsList() {
  const { data: spots, isLoading, error, refetch } = useSpots();


  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Chargement des spots...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-600 mb-4">
          Erreur lors du chargement des spots: {error.message}
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

  if (!spots || spots.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        Aucun spot disponible pour le moment.
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Nos Spots ({spots.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spots.map((spot: Spot) => (
          <div
            key={spot._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {spot.photo && (
              <Image
                src={spot.photo}
                alt={spot.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
              <p className="text-gray-600 mb-3 line-clamp-3">{spot.description}</p>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Coordonnées GPS:</span>
                  <span className="text-sm font-medium">{spot.gpsCoordinates}</span>
                </div>
              </div>

              {spot.practicedActivities && spot.practicedActivities.length > 0 && (
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    Activités pratiquées:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {spot.practicedActivities.map((activity) => (
                      <span
                        key={activity._id}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {activity.activityName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {spot.meetingPoint && (
                <div className="mt-3 pt-3 border-t">
                  <div className="space-y-1">
                    {spot.meetingPoint.half_day && (
                      <p className="text-xs text-gray-500">
                        <strong>Demi-journée:</strong> {spot.meetingPoint.half_day}
                      </p>
                    )}
                    {spot.meetingPoint.full_day && (
                      <p className="text-xs text-gray-500">
                        <strong>Journée complète:</strong> {spot.meetingPoint.full_day}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 