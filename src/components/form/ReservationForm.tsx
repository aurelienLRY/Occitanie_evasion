"use client";

import { useState, useEffect, useMemo } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reservationSchema } from '@/lib/validation/reservation-schema';
import { useActivities, useSpots, useBooking, useIsMobile } from '@/hooks';
import { transformActivityToFormData, transformSpotToFormData, calculateEndTime, formatDurationString } from '@/lib/utils/reservation-utils';
import { IBooking, ActivityFormData, SpotFormData } from '@/types';
import {
  SelectInput,
  DateInput,
  TimeInput,
  Input,
  NumberInput,
  Textarea,
  InputPhone,

} from '@/components/input';

import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { ReservationSummary } from '@/components/ui/summary';
import { ActivityInfoModal, SpotInfoModal } from '@/components/ui/modal';
import {
  Calendar,
  User,
  Users,
  Plus,
  Trash2,
  Activity as ActivityIcon,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Send,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const ReservationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<ActivityFormData | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<SpotFormData | null>(null);
  const [availableSpots, setAvailableSpots] = useState<SpotFormData[]>([]);

  // États pour les modales
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isSpotModalOpen, setIsSpotModalOpen] = useState(false);

  const TOTAL_STEPS = 4;

  // Récupération des données
  const { data: activities, isLoading: activitiesLoading } = useActivities();
  const { data: allSpots, isLoading: spotsLoading } = useSpots();
  const bookingMutation = useBooking();

  const methods = useForm({
    resolver: yupResolver(reservationSchema),
    defaultValues: {
      participants: [{ height: 0, weight: 0 }],
      sessionType: 'full-day',
      date: '',
      startTime: '10:00'
    }
  });



  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "participants"
  });

  // Surveiller les changements d'activité, type de session et spot
  const watchedActivityId = methods.watch('activityId');
  const watchedSessionType = methods.watch('sessionType');
  const watchedSpotId = methods.watch('spotId');
  const watchedStartTime = methods.watch('startTime');

  // Transformer les données de l'API avec useMemo pour éviter les recalculs
  const transformedActivities = useMemo(() =>
    activities?.map(transformActivityToFormData) || [],
    [activities]
  );
  const transformedSpots = useMemo(() =>
    allSpots?.map(transformSpotToFormData) || [],
    [allSpots]
  );

  // Filtrer les spots disponibles selon l'activité sélectionnée
  const availableSpotsForActivity = useMemo(() => {
    if (watchedActivityId && transformedSpots.length > 0) {
      return transformedSpots.filter(spot =>
        spot.activities.includes(watchedActivityId)
      );
    }
    return [];
  }, [watchedActivityId, transformedSpots]);

  // 1. Surveiller l'activité sélectionnée et ajuster le type de session
  useEffect(() => {
    if (watchedActivityId && transformedActivities.length > 0) {
      const activity = transformedActivities.find(a => a.id === watchedActivityId);
      setSelectedActivity(activity || null);

      // Ajuster le type de session selon l'activité
      if (activity) {
        const currentSessionType = methods.getValues('sessionType');

        if (!activity.halfDayAvailable && currentSessionType === 'half-day') {
          methods.setValue('sessionType', 'full-day');
        } else if (!activity.fullDayAvailable && currentSessionType === 'full-day') {
          methods.setValue('sessionType', 'half-day');
        } else if (activity.halfDayAvailable && activity.fullDayAvailable && !currentSessionType) {
          methods.setValue('sessionType', 'half-day');
        }
      }
    }
  }, [watchedActivityId, transformedActivities, methods]);

  // 2. Surveiller le spot sélectionné
  useEffect(() => {
    if (watchedSpotId && transformedSpots.length > 0) {
      const spot = transformedSpots.find(s => s.id === watchedSpotId);
      setSelectedSpot(spot || null);
    } else {
      setSelectedSpot(null);
    }
  }, [watchedSpotId, transformedSpots]);

  // 3. Mettre à jour les spots disponibles et réinitialiser si nécessaire
  useEffect(() => {
    setAvailableSpots(availableSpotsForActivity);

    if (availableSpotsForActivity.length > 0) {
      const currentSpotId = methods.getValues('spotId');
      if (!availableSpotsForActivity.find(s => s.id === currentSpotId)) {
        methods.setValue('spotId', '');
      }
    }
  }, [availableSpotsForActivity, methods]);

  // 4. Calculer l'heure de fin basée sur l'activité et le type de session
  useEffect(() => {
    if (selectedActivity && watchedStartTime && watchedSessionType) {
      const endTime = calculateEndTime(watchedStartTime, selectedActivity.durationHalf, selectedActivity.durationFull, watchedSessionType);
      methods.setValue('endTime', endTime);
    }
  }, [selectedActivity, watchedStartTime, watchedSessionType, methods]);

  // Validation par étape
  const validateCurrentStep = async () => {
    const stepFields: Record<number, string[]> = {
      1: ['clientFirstName', 'clientLastName', 'clientEmail', 'clientPhone'],
      2: ['activityId', 'spotId', 'sessionType', 'date', 'startTime'],
      3: ['participants'],
      4: [] // Pas de validation pour les demandes spéciales
    };

    const fieldsToValidate = stepFields[currentStep];
    if (fieldsToValidate.length === 0) return true;

    try {
      await methods.trigger(fieldsToValidate as (keyof typeof methods.getValues)[]);
      return methods.formState.errors && Object.keys(methods.formState.errors).length === 0;
    } catch {
      return false;
    }
  };

  // Navigation entre les étapes
  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else if (!isValid) {
      toast.error('Veuillez corriger les erreurs avant de continuer', {
        icon: <AlertCircle className="w-4 h-4" />,
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Ajouter un participant
  const addParticipant = () => {
    if (selectedActivity) {
      append({ height: 0, weight: 0 });
    }
  };

  // Supprimer un participant
  const removeParticipant = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  // Transformer les données du formulaire vers la structure Booking
  const transformFormDataToBooking = (data: Record<string, unknown>): IBooking => {
    if (!selectedActivity || !selectedSpot) {
      throw new Error('Aucune activité ou lieu sélectionné');
    }

    // Validation des données client
    if (!data.clientFirstName || !data.clientLastName || !data.clientEmail || !data.clientPhone) {
      throw new Error('Données client manquantes');
    }

    const sessionType = data.sessionType as 'full-day' | 'half-day';
    const priceApplicable = sessionType === 'half-day'
      ? selectedActivity.priceHalf
      : selectedActivity.priceFull;

    const participants = data.participants as Array<{ height: number; weight: number }>;
    const peopleList = participants.map(participant => ({
      size: participant.height.toString(),
      weight: participant.weight.toString(),
      price_applicable: priceApplicable,
      isReduced: false as const
    }));

    const booking: IBooking = {
      message: data.specialRequests as string,
      customer: {
        date: new Date(),
        status: "Waiting",
        typeOfReservation: "ByWeb",
        number_of_people: participants.length,
        last_name: data.clientLastName as string,
        first_names: data.clientFirstName as string,
        email: data.clientEmail as string,
        phone: data.clientPhone as string,
        people_list: peopleList,
        tarification: "standard",
        price_applicable: priceApplicable,
        price_total: priceApplicable * participants.length
      },
      session: {
        status: "Pending",
        date: new Date(data.date as string),
        startTime: data.startTime as string,
        endTime: (data.endTime as string) || '',
        activity: data.activityId as string,
        activityName: selectedActivity.name,
        spot: data.spotId as string,
        spotName: selectedSpot.name,
        placesMax: selectedActivity.maxParticipants,
        placesReserved: participants.length,
        type_formule: sessionType === 'half-day' ? 'half_day' : 'full_day',
        duration: sessionType === 'half-day' ? formatDurationString(selectedActivity.durationHalf) : formatDurationString(selectedActivity.durationFull)
      }
    };

    return booking;
  };

  // Soumission du formulaire
  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      const booking = transformFormDataToBooking(data);
      bookingMutation.mutate(booking);

      try {
        const response = await fetch("/api/reservation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(booking),
        });

        if (!response.ok) {
          console.warn('Erreur lors de l\'envoi de l\'email de sécurité:', await response.text());
        }
      } catch (emailError) {
        console.warn('Erreur lors de l\'envoi de l\'email de sécurité:', emailError);
      }

      toast.success('Réservation envoyée avec succès !', {
        description: 'Nous vous confirmerons votre réservation dans les plus brefs délais.',
        duration: 5000,
        icon: <CheckCircle className="w-4 h-4" />,
      });

      methods.reset();
      setSelectedActivity(null);
      setSelectedSpot(null);
      setAvailableSpots([]);
      setCurrentStep(1);

    } catch (error) {
      console.error('Erreur lors de la transformation des données:', error);
      toast.error('Erreur lors de l\'envoi de la réservation', {
        description: 'Veuillez réessayer ou nous contacter directement.',
        duration: 6000,
        icon: <AlertCircle className="w-4 h-4" />,
      });
    }
  };

  if (activitiesLoading || spotsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const stepTitles = [
    "Vos informations",
    "Activité et planning",
    "Participants",
    "Demandes spéciales"
  ];

  return (
    <div className="p-4  mx-auto bg-gray-100  rounded-lg">
      {/* Titre de l'étape */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800">
          {stepTitles[currentStep - 1]}
        </h2>
      </div>

      <div className="flex flex-col  gap-8">
        {/* Formulaire principal */}
        <div className="flex-1">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Étape 1: Informations client */}
                  {currentStep === 1 && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-500" />
                        Vos informations
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          name="clientFirstName"
                          type="text"
                          label="Prénom *"
                        />
                        <Input
                          name="clientLastName"
                          type="text"
                          label="Nom *"
                        />
                        <InputPhone
                          name="clientPhone"
                          type="tel"
                          label="Téléphone *"
                        />
                        <Input
                          name="clientEmail"
                          type="email"
                          label="Email *"
                        />
                      </div>
                    </div>
                  )}

                  {/* Étape 2: Activité et planning */}
                  {currentStep === 2 && (
                    <div className="space-y-3 bg-white rounded-lg shadow-md p-6">
                      <div className="">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                          <ActivityIcon className="w-5 h-5 text-blue-500" />
                          Sélection de l&apos;activité
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium text-gray-700">Activité *</label>
                              {selectedActivity && (
                                <button
                                  type="button"
                                  onClick={() => setIsActivityModalOpen(true)}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  <Info className="w-4 h-4" />
                                  Info
                                </button>
                              )}
                            </div>
                            <SelectInput
                              name="activityId"
                              label=""
                              options={transformedActivities.map(activity => ({ value: activity.id, label: activity.name }))}
                              placeholder="Sélectionnez une activité"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium text-gray-700">Lieu *</label>
                              {selectedSpot && (
                                <button
                                  type="button"
                                  onClick={() => setIsSpotModalOpen(true)}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  <Info className="w-4 h-4" />
                                  Info
                                </button>
                              )}
                            </div>
                            <SelectInput
                              name="spotId"
                              label=""
                              options={availableSpots.map(spot => ({ value: spot.id, label: spot.name }))}
                              placeholder={watchedActivityId ? "Sélectionnez un lieu" : "Sélectionnez d'abord une activité"}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-blue-500" />
                          Date et horaires
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          <SelectInput
                            name="sessionType"
                            label="Type de session *"
                            options={[
                              { value: 'full-day', label: 'Journée complète' },
                              { value: 'half-day', label: 'Demi-journée' }
                            ]}
                          />
                          <DateInput
                            name="date"
                            label="Date souhaitée *"
                            min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                          />
                          <TimeInput
                            name="startTime"
                            label="Heure de départ souhaitée *"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Étape 3: Participants */}
                  {currentStep === 3 && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-6">
                        <div className='space-y-1'>
                          <h3 className="text-xl font-bold flex items-center gap-2 mb-0">
                            <Users className="w-5 h-5 text-secondary" />
                            Participants ({fields.length})
                          </h3>
                          <div className="flex items-center gap-4  max-w-[600px]">
                            <Info className="w-10 h-10 text-blue-500 opacity-50" />
                            <div className='flex flex-col text-left'>
                              <p className="text-xl font-title  ">Pourquoi j&apos;ai besoin de vos tailles et poids <span className='text-secondary'>?</span> </p>
                              <p className="text-xs  text-gray-500">Ces informations sont nécessaires pour la préparation de l&apos;activité. Rien de plus désagréable qu&apos;une combinaison trop petite , ou de plus dangereux qu&apos;un baudrier trop grand ! </p>
                            </div>
                            </div>
                        </div>
                        <Button
                          type="button"
                          onClick={addParticipant}
                          disabled={!selectedActivity}
                          title="Ajouter un participant"
                          variant="secondary"
                          className="flex items-center gap-2  disabled:bg-gray-300 disabled:cursor-not-allowed"
                          size="sm"
                        >
                          <Plus className="w-4 h-4" />
                          Ajouter un participant
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {fields.map((field, index) => (
                          <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-4 mb-4">
                              <Avatar
                                seed={`participant-${field.id}`}
                                size={48}
                                style="adventurer"
                              />
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold">Participant {index + 1}</h4>
                              </div>
                              {fields.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeParticipant(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <NumberInput
                                name={`participants.${index}.height`}
                                label="Taille (cm) *"
                                min={100}
                                max={250}
                              />
                              <NumberInput
                                name={`participants.${index}.weight`}
                                label="Poids (kg) *"
                                min={20}
                                max={200}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Étape 4: Demandes spéciales */}
                  {currentStep === 4 && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-6">Demandes spéciales</h3>
                      <Textarea
                        name="specialRequests"
                        placeholder="Informations supplémentaires, allergies, préférences..."
                        rows={6}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Barre de progression */}


              {/* Boutons de navigation */}
              <NavControl
                prevStep={prevStep}
                nextStep={nextStep}
                currentStep={currentStep}
                TOTAL_STEPS={TOTAL_STEPS}
              />



              {/* Récapitulatif */}
              <div className="w-full flex-shrink-0" data-summary>
                <ReservationSummary
                  clientData={{
                    firstName: methods.watch('clientFirstName') || '',
                    lastName: methods.watch('clientLastName') || '',
                    email: methods.watch('clientEmail') || '',
                    phone: methods.watch('clientPhone') || ''
                  }}
                  activity={selectedActivity}
                  spot={selectedSpot}
                  sessionType={methods.watch('sessionType') as 'full-day' | 'half-day'}
                  date={methods.watch('date') || ''}
                  startTime={methods.watch('startTime') || ''}
                  endTime={methods.watch('endTime') || ''}
                  participants={methods.watch('participants') || []}
                  specialRequests={methods.watch('specialRequests') || ''}
                />

                {/* Bouton d'envoi après le récapitulatif */}
                {currentStep === TOTAL_STEPS && (
                  <div className="mt-8 flex justify-center">
                    <Button
                      type="submit"
                      variant="secondary"
                      disabled={methods.formState.isSubmitting}
                      className="flex items-center gap-2 disabled:cursor-not-allowed text-lg font-semibold shadow-lg"
                      size="lg"
                    >
                      {methods.formState.isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Confirmer la réservation
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </FormProvider>


        </div>
      </div>


      {/* Modales */}
      <ActivityInfoModal
        activity={selectedActivity}
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
      />

      <SpotInfoModal
        spot={selectedSpot}
        isOpen={isSpotModalOpen}
        onClose={() => setIsSpotModalOpen(false)}
      />
    </div>
  );
};

export default ReservationForm;

/**
 * Composant de navigation pour le formulaire de réservation
 * @param prevStep - Fonction pour revenir à l'étape précédente
 * @param nextStep - Fonction pour passer à l'étape suivante
 * @param currentStep - Étape courante
 * @param TOTAL_STEPS - Nombre total d'étapes
 * @returns Composant de navigation
 */
const NavControl = ({
  prevStep,
  nextStep,
  currentStep,
  TOTAL_STEPS
}: {
  prevStep: () => void;
  nextStep: () => void;
  currentStep: number;
  TOTAL_STEPS: number;
}) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div className="flex flex-col justify-center items-center gap-6 ">
        <div className=" w-full">
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>
        <div className="flex justify-between items-center gap-4 w-full">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 bg-transparent text-secondary hover:text-white rounded-md hover:bg-secondary border-secondary transition-all duration-300"
            variant="outline"
            size="sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </Button>

          {currentStep < TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-transparent text-secondary hover:text-white rounded-md hover:bg-secondary border-secondary transition-all duration-300"
              variant="outline"
              size="sm"
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </Button>

          ) : (
            <div
              className="flex items-center gap-2 px-6 py-3 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
              onClick={() => {
                // Scroll vers le récapitulatif
                const summaryElement = document.querySelector('[data-summary]');
                if (summaryElement) {
                  summaryElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="text-sm">Voir le récapitulatif</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>
          )}
        </div></div>
    )
  } else {
    return (
      <div className="flex justify-between items-center gap-4 ">
        <Button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 bg-transparent text-secondary hover:text-white rounded-md hover:bg-secondary border-secondary transition-all duration-300"
          variant="outline"
          size="sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </Button>
        <div className=" flex-1">
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>
        {currentStep < TOTAL_STEPS ? (
          <Button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-3 bg-transparent text-secondary hover:text-white rounded-md hover:bg-secondary border-secondary transition-all duration-300"
            variant="outline"
            size="sm"
          >
            Suivant
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <div
            className="flex items-center gap-2 px-6 py-3 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            onClick={() => {
              // Scroll vers le récapitulatif
              const summaryElement = document.querySelector('[data-summary]');
              if (summaryElement) {
                summaryElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="text-sm">Voir le récapitulatif</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        )}
      </div>
    )
  }
}

NavControl.displayName = 'NavControl';