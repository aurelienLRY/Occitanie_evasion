"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ISession } from '@/types';
import { Modal } from '@/components/ui/modal';
import { Input, InputPhone, NumberInput } from '@/components/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ProgressBar } from '@/components/ui/progress';
import { ReservationSummary } from '@/components/ui/summary';
import { CheckCircle, AlertCircle, Send, Users, Calendar, Clock, MapPin, ChevronLeft, ChevronRight, ChevronDown, Plus, Trash2, User, Info, Euro } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import * as yup from 'yup';
import { isReduced as isReducedUtils } from "@/lib/utils";
import { IAddCustomerBooking } from '@/types/reservation.types';
import { useAddCustomerBooking } from '@/hooks';

// Schéma de validation pour la réservation rapide
const quickBookingSchema = yup.object({
  clientFirstName: yup.string().required('Le prénom est requis'),
  clientLastName: yup.string().required('Le nom est requis'),
  clientEmail: yup.string().email('Email invalide').required('L\'email est requis'),
  clientPhone: yup.string().required('Le téléphone est requis'),
  participants: yup.array().of(
    yup.object({
      height: yup.number().min(100, 'Taille minimale 100cm').max(250, 'Taille maximale 250cm').required('Taille requise'),
      weight: yup.number().min(20, 'Poids minimal 20kg').max(200, 'Poids maximal 200kg').required('Poids requis')
    })
  ).min(1, 'Au moins un participant est requis').required(),
  specialRequests: yup.string().optional()
});

interface QuickBookingModalProps {
  session: ISession;
  isOpen: boolean;
  onClose: () => void;
}

const QuickBookingModal = React.memo(({ session, isOpen, onClose }: QuickBookingModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [participantCount, setParticipantCount] = useState(1);
  const { mutate: addCustomerBooking } = useAddCustomerBooking();

  const TOTAL_STEPS = 3;

  const methods = useForm({
    resolver: yupResolver(quickBookingSchema),
    defaultValues: {
      participants: [{ height: 0, weight: 0 }],
      specialRequests: ''
    },
    mode: 'onBlur' // Validation seulement au blur, pas à chaque frappe
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "participants"
  });



  // Validation par étape
  const validateCurrentStep = useCallback(async () => {
    const stepFields: Record<number, string[]> = {
      1: ['clientFirstName', 'clientLastName', 'clientEmail', 'clientPhone'],
      2: ['participants'],
      3: ['specialRequests']
    };

    const fieldsToValidate = stepFields[currentStep];
    if (fieldsToValidate.length === 0) return true;

    try {
      await methods.trigger(fieldsToValidate as (keyof typeof methods.getValues)[]);
      return methods.formState.errors && Object.keys(methods.formState.errors).length === 0;
    } catch {
      return false;
    }
  }, [currentStep, methods]);

  // Navigation entre les étapes
  const nextStep = useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else if (!isValid) {
      toast.error('Veuillez corriger les erreurs avant de continuer', {
        icon: <AlertCircle className="w-4 h-4" />,
      });
    }
  }, [currentStep, validateCurrentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  // Ajouter un participant
  const addParticipant = useCallback(() => {
    if (participantCount < session.placesMax - session.placesReserved) {
      append({ height: 0, weight: 0 });
      setParticipantCount(prev => prev + 1);
    }
  }, [participantCount, session.placesMax, session.placesReserved, append]);

  // Supprimer un participant
  const removeParticipant = useCallback((index: number) => {
    if (fields.length > 1) {
      remove(index);
      setParticipantCount(prev => prev - 1);
    }
  }, [fields.length, remove]);





  // Soumission du formulaire
  const onSubmit = async (data: {
    clientFirstName: string;
    clientLastName: string;
    clientEmail: string;
    clientPhone: string;
    participants: Array<{ height: number; weight: number }>;
    specialRequests?: string;
  }) => {
    setIsSubmitting(true);

    try {
      // Préparer les données pour l'API
      const bookingData: IAddCustomerBooking = {
        sessionId: session._id,
        customer: {
          date: new Date(),
          status: "Waiting",
          typeOfReservation: "ByWeb",
          number_of_people: data.participants.length,
          first_names: data.clientFirstName,
          last_name: data.clientLastName,
          email: data.clientEmail,
          phone: data.clientPhone,
          people_list: data.participants.map((p) => ({
            size: p.height.toString(),
            weight: p.weight.toString(),
            price_applicable: unitPrice,
            isReduced: isReduced
          })),
          tarification: isReduced ? "reduced" : "standard",
          price_applicable: unitPrice,
          price_total: calculatePrice
        },
        message: data.specialRequests || ''
      };
      await addCustomerBooking(bookingData);


      // Envoi de l'email de confirmation
      try {
        await fetch("/api/reservation", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: bookingData.message,
            customer: {
              ...bookingData.customer,
              date: new Date(),
              status: "Waiting",
              typeOfReservation: "ByWeb",
              number_of_people: data.participants.length,
              last_name: data.clientLastName,
              first_names: data.clientFirstName,
              email: data.clientEmail,
              phone: data.clientPhone,
              people_list: data.participants.map((p) => ({
                size: p.height.toString(),
                weight: p.weight.toString(),
                price_applicable: unitPrice,
                isReduced: isReduced
              })),
              tarification: isReduced ? "reduced" : "standard",
              price_applicable: unitPrice,
              price_total: calculatePrice
            },
            session: {
              ...session,
            }
          }),
        });
      } catch (emailError) {
        console.warn('Erreur lors de l\'envoi de l\'email de confirmation:', emailError);
      }

      toast.success('Réservation envoyée avec succès!', {
        description: `je t'enverrai un email de confirmation dans les plus brefs délais.`,
        duration: 5000,
        icon: <CheckCircle className="w-4 h-4" />,
      });

      // Fermer la modal et réinitialiser le formulaire
      onClose();
      methods.reset();
      setCurrentStep(1);

    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      toast.error('Erreur lors de la réservation', {
        description: 'Veuillez réessayer ou me contacter directement.',
        duration: 6000,
        icon: <AlertCircle className="w-4 h-4" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const availablePlaces = useMemo(() =>
    session.placesMax - session.placesReserved,
    [session.placesMax, session.placesReserved]
  );

  const isReduced = useMemo(() =>
    isReducedUtils(session),
    [session]
  );

  // Calculer le prix selon le type de session et le nombre de participants
  const calculatePrice = useMemo(() => {
    const sessionType = session.type_formule;
    const basePrice = sessionType === 'half_day'
      ? (isReduced ? session.activity.price_half_day.reduced : session.activity.price_half_day.standard)
      : (isReduced ? session.activity.price_full_day.reduced : session.activity.price_full_day.standard);

    return basePrice * fields.length;
  }, [session.type_formule, isReduced, session.activity.price_half_day, session.activity.price_full_day, fields.length]);

  // Prix unitaire affiché
  const unitPrice = useMemo(() =>
    session.type_formule === 'half_day'
      ? (isReduced ? session.activity.price_half_day.reduced : session.activity.price_half_day.standard)
      : (isReduced ? session.activity.price_full_day.reduced : session.activity.price_full_day.standard),
    [session.type_formule, isReduced, session.activity.price_half_day, session.activity.price_full_day]
  );

  // Obtenir la durée selon le type de session
  const getDuration = useMemo(() => {
    return session.type_formule === 'half_day'
      ? session.activity.duration.half
      : session.activity.duration.full;
  }, [session.type_formule, session.activity.duration.half, session.activity.duration.full]);

  // Prix affiché dans l'en-tête
  const displayPrice = useMemo(() => unitPrice, [unitPrice]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title={`Rejoindre la session "${session.activity.name}"`}>
      <div className="p-6">
        {/* En-tête avec informations de la session */}

        {/* Résumé de la session */}
        <div className="bg-gray-50 rounded-lg p-4 lg:px-14 grid grid-cols-1 md:grid-cols-2  gap-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-secondary" />
            <span className="font-medium">
              le {" "}
              {new Date(session.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-secondary" />
            <span className="font-medium"> formule {session.type_formule === 'half_day' ? 'Demi-journée' : 'Journée complète'}</span>
            <span className="font-medium">
              de {session.startTime} à {session.endTime}
            </span>
            <span className="font-medium"> ({getDuration})</span>
          </div>
          <div className="flex items-center gap-2">
            <Euro className="w-4 h-4 text-secondary" />
            <span className="font-medium">Tarif {isReduced ? ' réduit' : ''} : {displayPrice}€</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="font-medium">{session.spot.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-secondary" />
            <span className="font-medium">
              {availablePlaces} place{availablePlaces > 1 ? 's' : ''} disponible{availablePlaces > 1 ? 's' : ''}
            </span>
          </div>

        </div>

        {/* Formulaire de réservation avec slides */}
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
                    <div className="grid md:grid-cols-2 gap-4">
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



                {/* Étape 2: Participants */}
                {currentStep === 2 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-6">
                      <div className='space-y-1'>
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-0">
                          <Users className="w-5 h-5 text-secondary" />
                          Participants ({participantCount})
                        </h3>
                        <div className="flex items-center gap-4 max-w-[600px]">
                          <Info className="w-10 h-10 text-blue-500 opacity-50" />
                          <div className='flex flex-col text-left'>
                            <p className="text-xl font-title">Pourquoi j&apos;ai besoin de vos tailles et poids <span className='text-secondary'>?</span></p>
                            <p className="text-xs text-gray-500">Ces informations sont nécessaires pour la préparation de l&apos;activité. Rien de plus désagréable qu&apos;une combinaison trop petite, ou de plus dangereux qu&apos;un baudrier trop grand !</p>
                          </div>
                        </div>
                      </div>
                      {participantCount < availablePlaces && (
                        <Button
                          type="button"
                          onClick={addParticipant}
                          variant="secondary"
                          className="flex items-center gap-2"
                          size="sm"
                        >
                          <Plus className="w-4 h-4" />
                          Ajouter un participant
                        </Button>
                      )}
                    </div>

                    <div className="space-y-4">
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

                {/* Étape 3: Demandes spéciales */}
                {currentStep === 3 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-6">Demandes spéciales</h3>
                    <textarea
                      {...methods.register('specialRequests')}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Allergies, préférences, informations supplémentaires..."
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Barre de progression et navigation */}
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
              </div>

              <div className="flex justify-between items-center gap-4">
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
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="w-full flex-shrink-0" data-summary>
              <ReservationSummary
                clientData={{
                  firstName: methods.watch('clientFirstName') || '',
                  lastName: methods.watch('clientLastName') || '',
                  email: methods.watch('clientEmail') || '',
                  phone: methods.watch('clientPhone') || ''
                }}
                activityId={session.activity._id || ''}
                spotId={session.spot._id || ''}
                sessionType={session.type_formule === 'half_day' ? 'half-day' : 'full-day'}
                date={session.date.toString()}
                startTime={session.startTime}
                endTime={session.endTime}
                participants={methods.watch('participants') || []}
                specialRequests={methods.watch('specialRequests') || ''}
                customPrice={{
                  priceHalf: isReduced ? session.activity.price_half_day.reduced : session.activity.price_half_day.standard,
                  priceFull: isReduced ? session.activity.price_full_day.reduced : session.activity.price_full_day.standard,
                  isReduced: isReduced
                }}
              />

              {/* Bouton d'envoi après le récapitulatif */}
              {currentStep === TOTAL_STEPS && (
                <div className="mt-8 flex justify-center">
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 disabled:cursor-not-allowed text-lg font-semibold shadow-lg"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Réservation en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Confirmer la participation
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
});

QuickBookingModal.displayName = "QuickBookingModal";

export default QuickBookingModal;
