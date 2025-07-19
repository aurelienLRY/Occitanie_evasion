"use client";

import { useActivities, useSpots } from '@/hooks/useQuery';
import { ISpot, IActivity } from '@/types';
import Image from 'next/image';
import { Carousel } from './Carrousel';
import dynamic from 'next/dynamic';
import { MarkerLineSvg } from '@/components/ui/svg/MarkerLine.svg';

interface ActivitySpotsProps {
  activityName: string;
}

export const ActivitySpots = ({ activityName }: ActivitySpotsProps) => {
  const { data: allSpots, isLoading, error } = useSpots();
  const { data: activities } = useActivities();

  const MapCustomer = dynamic(() => import('./mapCustomer/index'), { ssr: false });

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 px-16 items-center py-16">
        <h2>Chargement des lieux de pratique...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col gap-6 px-16 items-center py-16">
        <h2>Erreur lors du chargement des lieux</h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  // Trouver l'activité correspondante pour obtenir son ID
  const activity = activities?.find((act: IActivity) =>
    act.name.toLowerCase().includes(activityName.toLowerCase())
  );

  if (!activity) {
    return (
      <div className="w-full flex flex-col gap-6 px-16 items-center py-16">
        <h2>Aucun lieu de pratique trouvé pour cette activité</h2>
      </div>
    );
  }

  // Filtrer les spots qui pratiquent cette activité
  const activitySpots = allSpots?.filter((spot: ISpot) =>
    spot.practicedActivities.some(practicedActivity =>
      practicedActivity.activityId === activity._id
    )
  ) || [];

  if (activitySpots.length === 0) {
    return (
      <div className="w-full flex flex-col gap-6 px-16 items-center py-16">
        <h2>Aucun lieu de pratique disponible pour cette activité</h2>
      </div>
    );
  }

  return (
      <div className=" flex flex-col lg:flex-row gap-6  items-center ">
        <Carousel slidesToShow={1} autoPlay={true} showDots={true} showArrows={false} showPlayPause={false} className="w-full h-full max-w-[600px] mx-auto">
          {activitySpots.map((spot: ISpot) => (
            <div key={spot._id} className=" rounded-lg  relative ">
              {spot.photo && (
                <div className="relative aspect-video w-full max-h-[250px]  rounded-lg overflow-hidden overflow-x-clip ">
                  <MarkerLineSvg className="w-[120%] h-12 absolute -bottom-7 rotate-180 left-1/2 -translate-x-1/2  z-50 text-primary" preserveAspectRatio="none" />
                  <Image
                    src={spot.photo}
                    alt={spot.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="!text-4xl lg:!text-6xl font-semibold text-center  text-white">{spot.name}</h3>
              <div className="p-6">
                <p className="text-white  line-clamp-3">
                  {spot.description}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
        <MapCustomer spots={activitySpots}  />
      </div>
  );
}; 