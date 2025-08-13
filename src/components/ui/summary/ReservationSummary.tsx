"use client";

import { Calendar, MapPin, Users, Clock, Euro, Activity, User, Mail, Phone, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { ActivityInfoModal, SpotInfoModal } from '@/components/ui/modal';
import { useState } from 'react';
import { useActivities, useSpots } from '@/hooks';
import { ReservationSummaryProps } from '@/types/reservation.types';

const ReservationSummary = ({
  clientData,
  activityId,
  spotId,
  sessionType,
  date,
  startTime,
  endTime,
  participants,
  specialRequests,
  customPrice
}: ReservationSummaryProps) => {
  // États pour les modales
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isSpotModalOpen, setIsSpotModalOpen] = useState(false);

  // Récupération des données via hooks
  const { data: activities } = useActivities();
  const { data: spots } = useSpots();

  // Trouver l'activité et le spot correspondants
  const activity = activities?.find(a => a._id === activityId) || null;
  const spot = spots?.find(s => s._id === spotId) || null;

  // Calcul du prix total
  const totalPrice = activity && participants.length > 0
    ? (sessionType === 'half-day' 
        ? (customPrice?.priceHalf || Number(activity.price_half_day.standard))
        : (customPrice?.priceFull || Number(activity.price_full_day.standard))
      ) * participants.length
    : 0;

  // Prix unitaire affiché
  const unitPrice = activity 
    ? (sessionType === 'half-day' 
        ? (customPrice?.priceHalf || Number(activity.price_half_day.standard))
        : (customPrice?.priceFull || Number(activity.price_full_day.standard))
      )
    : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  return (
    clientData.firstName && clientData.lastName  ?
    <div className="bg-white container rounded-lg shadow-md p-6 space-y-6 relative ">
      
      <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Récapitulatif de ta réservation</h2>

      <div className="w-fit flex flex-col justify-center gap-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          {/* Informations client */}
          {clientData.firstName && clientData.lastName && (
            <ItemSummaryCard title="Vos informations">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-secondary" />
                  <span className="font-medium text-gray-600">Nom & prénom: </span>
                  <p className="text-gray-900">{clientData.lastName} {clientData.firstName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-secondary" />
                  <span className="font-medium text-gray-600">Email:</span>
                  <p className="text-gray-900">{clientData.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span className="font-medium text-gray-600">Téléphone:</span>
                  <p className="text-gray-900">{clientData.phone}</p>
                </div>
              </div>
            </ItemSummaryCard>
          )}
          {/* Activité et lieu */}
          {activity && spot && (
            <ItemSummaryCard title="Activité et lieu">
              <div className="space-y-3">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-secondary" />
                    <span className="font-medium text-gray-600">Activité:</span>
                    <span className="text-gray-900">{activity.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsActivityModalOpen(true)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                    title="Voir les informations de l'activité"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="font-medium text-gray-600">Lieu:</span>
                    <span className="text-gray-900">{spot.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSpotModalOpen(true)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                    title="Voir les informations du lieu"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-row items-start md:items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="font-medium text-gray-600">Type de session:</span></div>
                  <span className="text-gray-900">
                    {sessionType === 'half-day' ? 'Demi-journée' : 'Journée complète'}
                  </span>
                </div>
              </div>
            </ItemSummaryCard>
          )}
          {/* Date et horaires */}
          {date && startTime && endTime && (
            <ItemSummaryCard title="Date et horaires">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span className="font-medium text-gray-600">Date:</span>
                  <span className="text-gray-900">{formatDate(date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span className="font-medium text-gray-600">Horaires:</span>
                  <span className="text-gray-900">{startTime} - {endTime}</span>
                </div>
                {activity && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="font-medium text-gray-600">Durée:</span>
                    <span className="text-gray-900">
                      {sessionType === 'half-day'
                        ? (activity.duration.half ? activity.duration.half : '4h')
                        : (activity.duration.full ? activity.duration.full : '8h')
                      }
                    </span>
                  </div>
                )}
              </div>
            </ItemSummaryCard>
          )}
        </div>
        {/* Participants */}
        {participants[0].height > 0 && participants[0].weight > 0 && (
          <ItemSummaryCard title="Participants">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-secondary" />
              <span className="font-medium text-gray-600">Nombre de participants:</span>
              <span className="text-gray-900">{participants.length}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {participants.map((participant, index) => (
                <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                  <span className="font-medium text-gray-600">Participant {index + 1}:</span>
                  <p className="text-gray-900">{participant.height}cm, {participant.weight}kg</p>
                </div>
              ))}
            </div>
          </ItemSummaryCard>
        )}
      {/* Demandes spéciales */}
      {specialRequests && (
        <ItemSummaryCard title="Demandes spéciales">
          <p className="text-gray-900 bg-gray-50 p-3 rounded">{specialRequests}</p>
        </ItemSummaryCard>
      )}

      {/* Prix total */}
      <div className="bg-primary/10 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Euro className="w-5 h-5 text-primary/80" />
            <span className="text-lg font-semibold text-primary">Prix total:</span>
          </div>
          <span className="text-2xl font-bold text-primary/80">{totalPrice}€</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {participants.length} participant(s) × {unitPrice}€
        </p>
      </div>
      </div>

      {/* Modales */}
      <ActivityInfoModal
        activity={activity}
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
      />

      <SpotInfoModal
        spot={spot}
        isOpen={isSpotModalOpen}
        onClose={() => setIsSpotModalOpen(false)}
      />
    </div>
    :
  ""

  );
};

export default ReservationSummary;
ReservationSummary.displayName = 'ReservationSummary';


const ItemSummaryCard = ({
  title,
  children

}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div className="border shadow-md border-gray-200 rounded-lg p-4"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl  text-gray-800 mb-4 text-center">{title}</h3>
      <hr className="border-secondary my-4 w-[100px] mx-auto" />
      <div className="space-y-3">
        {children}
      </div>
    </motion.div>
  )
}
ItemSummaryCard.displayName = 'ItemSummaryCard';


