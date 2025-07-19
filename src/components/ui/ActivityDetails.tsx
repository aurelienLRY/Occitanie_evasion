"use client";

import { useActivities } from '@/hooks/useQuery';
import { ActivityFormulas } from './ActivityFormulas';
import { ActivitySpots } from './ActivitySpots';

interface ActivityDetailsProps {
  activityName: string;
}

export const ActivityDetails = ({ activityName }: ActivityDetailsProps) => {
  const { isLoading, error } = useActivities();

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 px-16 items-center py-16">
        <h2>Chargement des détails de l&apos;activité...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col gap-6 px-16 items-center py-16">
        <h2>Erreur lors du chargement des détails</h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-16">
      {/* Section des formules */}
      <ActivityFormulas activityName={activityName} />
      
      {/* Section des spots */}
      <ActivitySpots activityName={activityName} />
    </div>
  );
}; 