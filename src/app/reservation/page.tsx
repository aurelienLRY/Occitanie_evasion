"use client";

import { useSearchParams } from 'next/navigation';
import ReservationForm from '@/components/form/ReservationForm';
import { ContactForm } from '@/components/form';
import { ReservationUrlParams } from '@/types/reservation.types';
import { useActiveSessions } from '@/hooks';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from 'lucide-react';
const Reservation = () => {
    const searchParams = useSearchParams();


    const { data: activeSessions } = useActiveSessions();

    // Récupération des paramètres d'URL
    const urlParams: ReservationUrlParams = {
        activity: searchParams.get('activity') || undefined,
        lieux: searchParams.get('lieux') || undefined,
        sessionType: searchParams.get('sessionType') || undefined,
    };

    return (
        <div className="min-h-screen  py-12 mt-20">
            <div className="container mx-auto ">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Réserve ton activité
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Remplis le formulaire ci-dessous pour réserver ton aventure.
                        Je te recontacte rapidement pour confirmer ta réservation.
                    </p>
                </div>
                <div className="flex flex-col-reverse lg:flex-row gap-6 text-center">
                    {activeSessions && (
                        <div className='w-full lg:w-1/3 lg:hover:w-2/3 transition-all duration-300 bg-primary/20 shadow-lg  rounded-lg p-4 text-center text-text flex flex-col gap-4'>
                            <div>
                                <h2 className='!text-3xl   '>
                                    Rejoinds-nous sur une de ces sessions<span className='text-secondary'>?</span>
                                </h2>
                                <p className=' text-gray-600 '>
                                    Je te propose de réserver une session de plein air avec moi.
                                </p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                {activeSessions.map((session) => (
                                    <div key={session._id} className=' relative min-w-[350px] shadow-lg  hover:shadow-xl transition-all duration-300   overflow-hidden group'>
                                        <div key={session._id} className='flex gap-2 justify-between items-center bg-white  rounded-lg px-4 '>
                                            <Image src={`/icon/_Icon${session.activity.name.toLowerCase()}.svg`} alt={session.activity.name} width={100} height={100}
                                                className='absolute left-20 w-1/2 h-full object-cover  opacity-30 overflow-hidden group-hover:opacity-20 transition-all duration-300 ' />
                                            <div className=' flex flex-col gap-1 px-6  py-2 w-full  z-10 '>
                                                <h3 className='!text-3xl text-left'>{session.activity.name.trim()}</h3>
                                                <p className='text-sm flex items-center gap-2'> <MapPinIcon className='w-4 h-4 text-secondary' /> : {session.spot.name}</p>
                                                <p className='text-sm text-gray-600 flex items-center gap-2'><CalendarIcon className='w-4 h-4 text-secondary' />   : {new Date(session.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                                <p className='text-sm text-gray-600 flex items-center gap-2'><ClockIcon className='w-4 h-4 text-secondary' />   : {session.startTime} - {session.endTime}</p>
                                                <p className='text-sm text-gray-600 flex items-center gap-2'><UsersIcon className='w-4 h-4 text-secondary' />   : {session.placesMax - session.placesReserved} places restantes </p>
                                            </div>

                                            <div className='bg-secondary text-white px-4 py-2 rounded-lg group-hover:scale-110 transition-all duration-300'>Participer</div>
                                        </div>
                                        </div>
                                ))}
                            </div>



                        </div>)}
                    <div className='w-full lg:w-2/3'>
                        <ReservationForm urlParams={urlParams} />
                    </div>

                </div>
                <div className='w-full px-4 mt-12'>
                    <h2 className=' font-bold text-text '>
                        Vous avez des questions ?
                    </h2>
                    <p className='text-lg text-gray-600'>
                        Je suis là pour t&apos;aider.
                    </p>
                    <ContactForm />
                </div>




            </div>
        </div>
    );
};

export default Reservation;