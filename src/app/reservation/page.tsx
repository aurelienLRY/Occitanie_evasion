"use client";

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ReservationForm from '@/components/form/ReservationForm';
import { ContactForm } from '@/components/form';
import { ReservationUrlParams } from '@/types/reservation.types';
import { useActiveSessions } from '@/hooks';
import IsBookingCard from '@/components/ui/card/isBooking.Card';
import { SpotInfoModal, QuickBookingModal, ActivityInfoModal } from '@/components/ui/modal';
import { ISession, ISpot, IActivity } from '@/types';

const Reservation = () => {
    const searchParams = useSearchParams();
    const { data: activeSessions } = useActiveSessions();

    // États pour les modales
    const [isSpotModalOpen, setIsSpotModalOpen] = useState(false);
    const [isQuickBookingModalOpen, setIsQuickBookingModalOpen] = useState(false);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState<ISession | null>(null);
    const [selectedSpot, setSelectedSpot] = useState<ISpot | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

    // Récupération des paramètres d'URL
    const urlParams: ReservationUrlParams = {
        activity: searchParams.get('activity') || undefined,
        lieux: searchParams.get('lieux') || undefined,
        sessionType: searchParams.get('sessionType') || undefined,
    };

    // Gestionnaire pour ouvrir la modal d'information sur le lieu (depuis IsBookingCard)
    const handleSpotInfoClick = (session: ISession) => {
        setSelectedSpot(session.spot);
        setIsSpotModalOpen(true);
    };

    // Gestionnaire pour ouvrir la modal d'information sur l'activité (depuis ReservationForm)
    const handleActivityInfoClick = (activity: IActivity) => {
        setSelectedActivity(activity);
        setIsActivityModalOpen(true);
    };

    // Gestionnaire pour ouvrir la modal d'information sur le lieu (depuis ReservationForm)
    const handleSpotInfoClickFromForm = (spot: ISpot) => {
        setSelectedSpot(spot);
        setIsSpotModalOpen(true);
    };

    // Gestionnaire pour ouvrir la modal de réservation rapide
    const handleBookSessionClick = (session: ISession) => {
        setSelectedSession(session);
        setIsQuickBookingModalOpen(true);
    };

    // Fermeture des modales
    const closeSpotModal = () => {
        setIsSpotModalOpen(false);
        setSelectedSpot(null);
    };

    const closeActivityModal = () => {
        setIsActivityModalOpen(false);
        setSelectedActivity(null);
    };

    const closeQuickBookingModal = () => {
        setIsQuickBookingModalOpen(false);
        setSelectedSession(null);
    };

    return (
        <div className="min-h-screen py-12 mt-20">
            <div className="container mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                       Réserve ton activité.
                    </h1>
                    <p className="text-gray-600 text-center">
                        {activeSessions ? "Tu as le choix , entre rejoindre une des session déjà programmées ou créer la tienne via le formulaire ci-dessous." : ""}
                    </p>
                </div>
                
                <div className="flex flex-col-reverse lg:flex-row gap-6 text-center">
                    {activeSessions && (
                        <div className='w-full lg:w-1/3 lg:hover:w-2/3 transition-all duration-300 bg-primary/20 shadow-lg rounded-lg p-4 text-center text-text flex flex-col gap-4'>
                            <div>
                                <h2 className='mb-1'>
                                    Rejoinds-nous<span className='text-secondary'>!</span>
                                </h2>
                                <p className='text-gray-600'>
                                    Je suis déjà de sortie , l&apos;occasion de rejoindre une de ces sessions.
                                </p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                {activeSessions.map((session) => (
                                    <IsBookingCard 
                                        key={session._id} 
                                        session={session}
                                        onSpotInfoClick={handleSpotInfoClick}
                                        onBookSessionClick={handleBookSessionClick}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className='w-full lg:w-2/3'>
                        <ReservationForm 
                            urlParams={urlParams}
                            onActivityInfoClick={handleActivityInfoClick}
                            onSpotInfoClick={handleSpotInfoClickFromForm}
                        />
                    </div>
                </div>
                
                <div className='w-full px-4 mt-12'>
                    <h2 className='font-bold text-text'>
                        Vous avez des questions ?
                    </h2>
                    <p className='text-lg text-gray-600'>
                        Je suis là pour t&apos;aider.
                    </p>
                    <ContactForm />
                </div>
            </div>

            {/* Modales centralisées */}
            
            {/* Modal d'information sur l'activité */}
            {selectedActivity && (
                <ActivityInfoModal
                    activity={selectedActivity}
                    isOpen={isActivityModalOpen}
                    onClose={closeActivityModal}
                />
            )}

            {/* Modal d'information sur le lieu */}
            {selectedSpot && (
                <SpotInfoModal
                    spot={selectedSpot}
                    isOpen={isSpotModalOpen}
                    onClose={closeSpotModal}
                />
            )}

            {/* Modal de réservation rapide */}
            {selectedSession && (
                <QuickBookingModal
                    session={selectedSession}
                    isOpen={isQuickBookingModalOpen}
                    onClose={closeQuickBookingModal}
                />
            )}
        </div>
    );
};

export default Reservation;