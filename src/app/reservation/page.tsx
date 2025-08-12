"use client";

import { useSearchParams } from 'next/navigation';
import ReservationForm from '@/components/form/ReservationForm';
import { ContactForm } from '@/components/form';
import { ReservationUrlParams } from '@/types/reservation.types';
import { useActiveSessions } from '@/hooks';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import IsBookingCard from '@/components/ui/card/isBooking.Card';
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
                <div className=" mb-12">
                    <h1 className=" text-4xl font-bold text-gray-900 mb-4 text-center">
                       Réserve ton activité.
                    </h1>
                    <p className=" text-gray-600  text-center">
                        {activeSessions ? "Tu as le choix , entre rejoindre une des session déjà programmées ou créer la tienne via le formulaire ci-dessous." : ""}
                    </p>
                </div>
                <div className="flex flex-col-reverse lg:flex-row gap-6 text-center">
                    {activeSessions && (
                        <div className='w-full lg:w-1/3 lg:hover:w-2/3 transition-all duration-300 bg-primary/20 shadow-lg  rounded-lg p-4 text-center text-text flex flex-col gap-4'>
                            <div>
                                <h2 className='mb-1  '>
                                    Rejoinds-nous<span className='text-secondary'>!</span>
                                </h2>
                                <p className=' text-gray-600 '>
                                    Je suis déjà de sortie , l&apos;occasion de rejoindre une de ces sessions.
                                </p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                {activeSessions.map((session) => (
                                    <IsBookingCard key={session._id} session={session} />
                                     
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