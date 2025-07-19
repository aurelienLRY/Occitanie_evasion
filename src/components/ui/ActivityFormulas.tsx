"use client";

import { useActivities } from '@/hooks/useQuery';
import { IActivity } from '@/types';
import Link from 'next/link';
import { Button } from './button';
import { Clock, Users, Euro, Calendar, Star, Info } from 'lucide-react';
import { useState } from 'react';

interface ActivityFormulasProps {
    activityName: string;
    reducedPriceConditions?: string; // Conditions pour le tarif réduit
    ACMPriceConditions?: string; // Conditions pour le tarif ACM
    description_half?: string;
    description_full?: string;
}

export const ActivityFormulas = ({ activityName, reducedPriceConditions, ACMPriceConditions, description_half, description_full }: ActivityFormulasProps) => {
    const { data: activities, isLoading, error } = useActivities();
    const [showReducedInfoHalf, setShowReducedInfoHalf] = useState(false);
    const [showACMInfoHalf, setShowACMInfoHalf] = useState(false);
    const [showReducedInfoFull, setShowReducedInfoFull] = useState(false);
    const [showACMInfoFull, setShowACMInfoFull] = useState(false);

    if (isLoading) {
        return (
            <div className="w-full flex flex-col gap-6 px-16 items-center py-16" role="status" aria-live="polite">
                <h2>Chargement des formules...</h2>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" aria-label="Chargement en cours"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex flex-col gap-6 px-16 items-center py-16" role="alert" aria-live="assertive">
                <h2>Erreur lors du chargement des formules</h2>
                <p className="text-red-600">{error.message}</p>
            </div>
        );
    }

    // Trouver l'activité correspondante
    const activity = activities?.find((act: IActivity) =>
        act.name.toLowerCase().includes(activityName.toLowerCase())
    );

    if (!activity) {
        return (
            <div className="w-full flex flex-col gap-6 px-16 items-center py-16" role="status">
                <h2>Aucune formule disponible pour cette activité</h2>
            </div>
        );
    }

    return (
        <section className="container mx-auto flex flex-col gap-8" aria-labelledby="formulas-title">
            <h2 id="formulas-title" className="sr-only">Formules disponibles pour {activityName}</h2>
            <div className="flex flex-col lg:flex-row gap-8 mx-auto" role="list" aria-label="Formules d'activité">
                {activity.half_day && (
                    <article className="bg-white min-h-full min-w-[350px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 max-w-sm border border-gray-100" role="listitem">
                        <div className='flex flex-col justify-between h-full'>
                        <header className="text-center mb-6">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                               <Clock className="w-6 h-6 text-primary" /> 
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Demi-journée</h3>
                            <hr className='w-24 h-1 bg-primary mx-auto rounded-full mt-4' aria-hidden="true"/>
                        </header>
                        {description_half && (
                            <div className="text-gray-600 text-sm text-justify py-4">
                                {description_half}
                            </div>
                        )}
                        <div className="space-y-4 mb-6 bg-primary/10 rounded-lg p-4" role="list" aria-label="Informations de la demi-journée">
                            <div className="flex items-center gap-3" role="listitem">
                                <Clock className="w-5 h-5 text-gray-500" aria-hidden="true" />
                                <span className="text-gray-600">Durée:</span>
                                <span className="font-semibold text-gray-800 ml-auto">{activity.duration.half}</span>
                            </div>

                            <div className="flex items-center gap-3" role="listitem">
                                <Users className="w-5 h-5 text-gray-500" aria-hidden="true" />
                                <span className="text-gray-600">Participants:</span>
                                <span className="font-semibold text-gray-800 ml-auto">de {activity.min_OfPeople} à {activity.max_OfPeople}</span>
                            </div>

                            <div className="flex items-center gap-3" role="listitem">
                                <Calendar className="w-5 h-5 text-gray-500" aria-hidden="true" />
                                <span className="text-gray-600">Âge minimum:</span>
                                <span className="font-semibold text-gray-800 ml-auto">{activity.min_age} ans</span>
                            </div>
                        </div>

                        <div className="bg-primary/20 rounded-lg p-4 mb-6" role="region" aria-label="Tarifs demi-journée">
                            <div className="text-center mb-3">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Euro className="w-5 h-5 text-primary" aria-hidden="true" />
                                    <span className="text-lg font-semibold text-gray-800">Tarifs</span>
                                </div>
                            </div>

                            <div className="space-y-2" role="list" aria-label="Liste des tarifs">
                                <div className="flex justify-between items-center" role="listitem">
                                    <span className="text-gray-600">Tarif standard:</span>
                                    <span className="font-bold text-xl text-primary">{activity.price_half_day.standard}€</span>
                                </div>

                                <div className="flex justify-between items-center" role="listitem">
                                    <span className="text-gray-600">Tarif réduit:</span>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-lg text-green-600">{activity.price_half_day.reduced}€</span>
                                        {reducedPriceConditions && (
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    className="w-4 h-4 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                                                    onMouseEnter={() => setShowReducedInfoHalf(true)}
                                                    onMouseLeave={() => setShowReducedInfoHalf(false)}
                                                    onFocus={() => setShowReducedInfoHalf(true)}
                                                    onBlur={() => setShowReducedInfoHalf(false)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            setShowReducedInfoHalf(!showReducedInfoHalf);
                                                        }
                                                    }}
                                                    aria-label="Informations sur les conditions du tarif réduit"
                                                    aria-expanded={showReducedInfoHalf}
                                                    aria-describedby={showReducedInfoHalf ? "reduced-info-half" : undefined}
                                                >
                                                    <Info className="w-4 h-4" aria-hidden="true" />
                                                </button>
                                                {showReducedInfoHalf && (
                                                    <div 
                                                        id="reduced-info-half"
                                                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-blue-900 text-white text-xs rounded-lg shadow-lg z-10 whitespace-nowrap"
                                                        role="tooltip"
                                                        aria-hidden="false"
                                                    >
                                                        {reducedPriceConditions}
                                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-900" aria-hidden="true"></div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {
                                    activity.price_half_day.ACM > 0 && (
                                        <div className="flex justify-between items-center" role="listitem">
                                            <span className="text-gray-600">Tarif ACM:</span>
                                            <div className="flex items-center gap-1">
                                                <span className="font-bold text-lg text-green-600">{activity.price_half_day.ACM}€</span>
                                                {ACMPriceConditions && (
                                                    <div className="relative">
                                                        <button
                                                            type="button"
                                                            className="w-4 h-4 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                                                            onMouseEnter={() => setShowACMInfoHalf(true)}
                                                            onMouseLeave={() => setShowACMInfoHalf(false)}
                                                            onFocus={() => setShowACMInfoHalf(true)}
                                                            onBlur={() => setShowACMInfoHalf(false)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter' || e.key === ' ') {
                                                                    e.preventDefault();
                                                                    setShowACMInfoHalf(!showACMInfoHalf);
                                                                }
                                                            }}
                                                            aria-label="Informations sur les conditions du tarif ACM"
                                                            aria-expanded={showACMInfoHalf}
                                                            aria-describedby={showACMInfoHalf ? "acm-info-half" : undefined}
                                                        >
                                                            <Info className="w-4 h-4" aria-hidden="true" />
                                                        </button>
                                                        {showACMInfoHalf && (
                                                            <div 
                                                                id="acm-info-half"
                                                                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-blue-900 text-white text-xs rounded-lg shadow-lg z-10 whitespace-nowrap"
                                                                role="tooltip"
                                                                aria-hidden="false"
                                                            >
                                                                {ACMPriceConditions}
                                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-900" aria-hidden="true"></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>

                        <Link href={`/reservation?activity=${activity._id}&type=half`} aria-label={`Réserver une demi-journée de ${activityName}`}>
                            <Button variant="primary" className="w-full py-3 text-lg font-semibold">
                                Réserver demi-journée
                            </Button>
                        </Link>
                        </div>
                    </article>
                )}

                {activity.full_day && (
                    <article className="bg-white min-h-full min-w-[350px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 max-w-sm border border-gray-100 relative" role="listitem">
                        <div className="absolute -top-3 -right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold" aria-label="Formule populaire">
                            <Star className="w-4 h-4 inline mr-1" aria-hidden="true" />
                            Populaire
                        </div>

                        <div className='flex flex-col gap-4 justify-between h-full'>

                            <header className="text-center mb-6">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                                    <Calendar className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Journée complète</h3>
                                <hr className='w-24 h-1 bg-primary mx-auto rounded-full mt-4' aria-hidden="true"/>
                            </header>
                            {description_full && (
                                <div className="text-gray-600 text-sm text-justify py-4">
                                    {description_full}
                                </div>
                            )}
                            <div className="space-y-4 mb-6 bg-primary/10 rounded-lg p-4" role="list" aria-label="Informations de la journée complète">
                                <div className="flex items-center gap-3" role="listitem">
                                    <Clock className="w-5 h-5 text-gray-500" aria-hidden="true" />
                                    <span className="text-gray-600">Durée:</span>
                                    <span className="font-semibold text-gray-800 ml-auto">{activity.duration.full}</span>
                                </div>

                                <div className="flex items-center gap-3" role="listitem">
                                    <Users className="w-5 h-5 text-gray-500" aria-hidden="true" />
                                    <span className="text-gray-600">Participants:</span>
                                    <span className="font-semibold text-gray-800 ml-auto">{activity.min_OfPeople}-{activity.max_OfPeople}</span>
                                </div>

                                <div className="flex items-center gap-3" role="listitem">
                                    <Calendar className="w-5 h-5 text-gray-500" aria-hidden="true" />
                                    <span className="text-gray-600">Âge minimum:</span>
                                    <span className="font-semibold text-gray-800 ml-auto">{activity.min_age} ans</span>
                                </div>
                            </div>

                            <div className="bg-primary/20 rounded-lg p-4 mb-6" role="region" aria-label="Tarifs journée complète">
                                <div className="text-center mb-3">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Euro className="w-5 h-5 text-primary" aria-hidden="true" />
                                        <span className="text-lg font-semibold text-gray-800">Tarifs</span>
                                    </div>
                                </div>

                                <div className="space-y-2" role="list" aria-label="Liste des tarifs">
                                    <div className="flex justify-between items-center" role="listitem">
                                        <span className="text-gray-600">Tarif standard:</span>
                                        <span className="font-bold text-xl text-primary">{activity.price_full_day.standard}€</span>
                                    </div>

                                    <div className="flex justify-between items-center" role="listitem">
                                        <span className="text-gray-600">Tarif réduit:</span>
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-lg text-green-600">{activity.price_full_day.reduced}€</span>
                                            {reducedPriceConditions && (
                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        className="w-4 h-4 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                                                        onMouseEnter={() => setShowReducedInfoFull(true)}
                                                        onMouseLeave={() => setShowReducedInfoFull(false)}
                                                        onFocus={() => setShowReducedInfoFull(true)}
                                                        onBlur={() => setShowReducedInfoFull(false)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                e.preventDefault();
                                                                setShowReducedInfoFull(!showReducedInfoFull);
                                                            }
                                                        }}
                                                        aria-label="Informations sur les conditions du tarif réduit"
                                                        aria-expanded={showReducedInfoFull}
                                                        aria-describedby={showReducedInfoFull ? "reduced-info-full" : undefined}
                                                    >
                                                        <Info className="w-4 h-4" aria-hidden="true" />
                                                    </button>
                                                    {showReducedInfoFull && (
                                                        <div 
                                                            id="reduced-info-full"
                                                            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-blue-900 text-white text-xs rounded-lg shadow-lg z-10 whitespace-nowrap"
                                                            role="tooltip"
                                                            aria-hidden="false"
                                                        >
                                                            {reducedPriceConditions}
                                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-900" aria-hidden="true"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {
                                        activity.price_full_day.ACM > 0 && (
                                            <div className="flex justify-between items-center" role="listitem">
                                                <span className="text-gray-600">Tarif ACM:</span>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-lg text-green-600">{activity.price_full_day.ACM}€</span>
                                                    {ACMPriceConditions && (
                                                        <div className="relative">
                                                            <button
                                                                type="button"
                                                                className="w-4 h-4 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                                                                onMouseEnter={() => setShowACMInfoFull(true)}
                                                                onMouseLeave={() => setShowACMInfoFull(false)}
                                                                onFocus={() => setShowACMInfoFull(true)}
                                                                onBlur={() => setShowACMInfoFull(false)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                                        e.preventDefault();
                                                                        setShowACMInfoFull(!showACMInfoFull);
                                                                    }
                                                                }}
                                                                aria-label="Informations sur les conditions du tarif ACM"
                                                                aria-expanded={showACMInfoFull}
                                                                aria-describedby={showACMInfoFull ? "acm-info-full" : undefined}
                                                            >
                                                                <Info className="w-4 h-4" aria-hidden="true" />
                                                            </button>
                                                            {showACMInfoFull && (
                                                                <div 
                                                                    id="acm-info-full"
                                                                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-blue-900 text-white text-xs rounded-lg shadow-lg z-10 whitespace-nowrap"
                                                                    role="tooltip"
                                                                    aria-hidden="false"
                                                                >
                                                                    {ACMPriceConditions}
                                                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-900" aria-hidden="true"></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>

                            <Link href={`/reservation?activity=${activity._id}&type=full`} aria-label={`Réserver une journée complète de ${activityName}`}>
                                <Button variant="primary" className="w-full py-3 text-lg font-semibold">
                                    Réserver journée complète
                                </Button>
                            </Link>
                        </div>
                    </article>
                )}
            </div>
        </section>
    );
}; 