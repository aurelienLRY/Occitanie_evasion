"use client";

import { useState, useEffect, useMemo } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reservationSchema } from '@/lib/validation/reservation-schema';
import { useActivities, useSpots, useBooking } from '@/hooks/useQuery';
import { ActivityFormData, SpotFormData, transformActivityToFormData, transformSpotToFormData, calculateEndTime } from '@/lib/utils/reservation-utils';
import { IBooking } from '@/types/reservation.type';
import { 
  SelectInput, 
  DateInput, 
  TimeInput, 
  Input, 
  NumberInput, 
  Textarea 
} from '@/components/input';
import { 
  Calendar, 
  User, 
  Users, 
  Plus, 
  Trash2,
  Activity as ActivityIcon
} from 'lucide-react';

const ReservationForm = () => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityFormData | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<SpotFormData | null>(null);
  const [availableSpots, setAvailableSpots] = useState<SpotFormData[]>([]);
  
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
      startTime: '09:00'
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
          // Si l'activité ne propose que des journées complètes, forcer le type
          methods.setValue('sessionType', 'full-day');
        } else if (!activity.fullDayAvailable && currentSessionType === 'full-day') {
          // Si l'activité ne propose que des demi-journées, forcer le type
          methods.setValue('sessionType', 'half-day');
        } else if (activity.halfDayAvailable && activity.fullDayAvailable && !currentSessionType) {
          // Si l'activité propose les deux et qu'aucun type n'est sélectionné, mettre demi-journée par défaut
          methods.setValue('sessionType', 'half-day');
        }
      }
    }
  }, [watchedActivityId, transformedActivities]);

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
    
    // Réinitialiser le spot sélectionné si il n'est plus disponible
    if (availableSpotsForActivity.length > 0) {
      const currentSpotId = methods.getValues('spotId');
      if (!availableSpotsForActivity.find(s => s.id === currentSpotId)) {
        methods.setValue('spotId', '');
      }
    }
  }, [availableSpotsForActivity]);

  // 4. Calculer l'heure de fin basée sur l'activité et le type de session
  useEffect(() => {
    if (selectedActivity && watchedStartTime && watchedSessionType) {
      const endTime = calculateEndTime(watchedStartTime, selectedActivity.durationHalf, selectedActivity.durationFull, watchedSessionType);
      methods.setValue('endTime', endTime);
    }
  }, [selectedActivity, watchedStartTime, watchedSessionType]);

  // Ajouter un participant
  const addParticipant = () => {
    if (selectedActivity && fields.length < selectedActivity.maxParticipants) {
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
    if (!selectedActivity) {
      throw new Error('Aucune activité sélectionnée');
    }

    // Calculer le prix applicable selon le type de session
    const sessionType = data.sessionType as 'full-day' | 'half-day';
    const priceApplicable = sessionType === 'half-day' 
      ? selectedActivity.priceHalf 
      : selectedActivity.priceFull;

    // Calculer la durée selon le type de session
    const duration = sessionType === 'half-day' 
      ? selectedActivity.durationHalf 
      : selectedActivity.durationFull;

    // Transformer les participants
    const participants = data.participants as Array<{ height: number; weight: number }>;
    const peopleList = participants.map(participant => ({
      size: participant.height.toString(),
      weight: participant.weight.toString(),
      price_applicable: priceApplicable,
      isReduced: false as const
    }));

    // Créer l'objet Booking
    const booking: IBooking = {
      customer: {
        date: new Date(),
        status: "Waiting",
        typeOfReservation: "by_website",
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
        spot: data.spotId as string,
        placesMax: selectedActivity.maxParticipants,
        placesReserved: participants.length,
        type_formule: sessionType === 'half-day' ? 'half_day' : 'full_day',
        duration: `${duration}h`
      }
    };

    return booking;
  };

  // Soumission du formulaire
  const onSubmit = (data: Record<string, unknown>) => {
    try {
      const booking = transformFormDataToBooking(data);
      console.log('Données de réservation transformées:', booking);
      
      // Envoyer la réservation à l'API
      bookingMutation.mutate(booking);
      
    } catch (error) {
      console.error('Erreur lors de la transformation des données:', error);
    }
  };

  if (activitiesLoading || spotsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
        {/* Section 1: Sélection de l'activité et du lieu */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ActivityIcon className="w-6 h-6 text-blue-500" />
            Sélection de l&apos;activité
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Activité */}
            <SelectInput
              name="activityId"
              label="Activité *"
              options={transformedActivities.map(activity => ({ id: activity.id, name: activity.name }))}
              placeholder="Sélectionnez une activité"
            />

            {/* Lieu */}
            <SelectInput
              name="spotId"
              label="Lieu *"
              options={availableSpots.map(spot => ({ id: spot.id, name: spot.name }))}
              placeholder={watchedActivityId ? "Sélectionnez un lieu" : "Sélectionnez d'abord une activité"}
              disabled={!watchedActivityId}
            />
          </div>

          {/* Informations sur l'activité sélectionnée */}
          {selectedActivity && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-900">{selectedActivity.name}</h3>
              <p className="text-blue-700 text-sm mt-1">{selectedActivity.description}</p>
              <div className="flex gap-4 mt-2 text-sm text-blue-600">
                <span>Durée: {watchedSessionType === 'half-day' ? selectedActivity.durationHalf : selectedActivity.durationFull}h</span>
                <span>Prix: {watchedSessionType === 'half-day' ? selectedActivity.priceHalf : selectedActivity.priceFull}€</span>
                <span>Participants: {selectedActivity.minParticipants}-{selectedActivity.maxParticipants}</span>
                <span>Type: {selectedActivity.halfDayAvailable && selectedActivity.fullDayAvailable ? 'Journée/Demi-journée' : selectedActivity.halfDayAvailable ? 'Demi-journée uniquement' : 'Journée complète uniquement'}</span>
              </div>
            </div>
          )}

          {/* Informations sur le spot sélectionné */}
          {selectedSpot && (
            <div className="mt-4 p-4 bg-green-50 rounded-md">
              <h3 className="font-semibold text-green-900">{selectedSpot.name}</h3>
              <p className="text-green-700 text-sm mt-1">{selectedSpot.description}</p>
              <div className="flex gap-4 mt-2 text-sm text-green-600">
                <span>Localisation: {selectedSpot.location}</span>
                <span>Difficulté: {selectedSpot.difficulty}</span>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Date et horaires */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            Date et horaires
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Type de session */}
            <SelectInput
              name="sessionType"
              label="Type de session *"
              options={[
                { id: 'full-day', name: 'Journée complète' },
                { id: 'half-day', name: 'Demi-journée' }
              ]}
              disabled={selectedActivity && !(selectedActivity.halfDayAvailable && selectedActivity.fullDayAvailable)}
            />

            {/* Date */}
            <DateInput
              name="date"
              label="Date souhaitée *"
              min={new Date().toISOString().split('T')[0]}
            />

            {/* Heure de départ */}
            <TimeInput
              name="startTime"
              label="Heure de départ *"
            />
          </div>

          {/* Heure de fin calculée */}
          {methods.watch('endTime') && (
            <div className="mt-4 p-3 bg-green-50 rounded-md">
              <p className="text-green-700 text-sm">
                <strong>Heure de fin calculée:</strong> {methods.watch('endTime')}
              </p>
              {selectedActivity && (
                <p className="text-green-600 text-sm mt-1">
                  Durée: {watchedSessionType === 'half-day' ? selectedActivity.durationHalf : selectedActivity.durationFull}h
                </p>
              )}
            </div>
          )}
        </div>

        {/* Section 3: Informations du client principal */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-500" />
            Vos informations
          </h2>
          
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

            <Input
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

        {/* Section 4: Participants */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" />
              Participants ({fields.length}/{selectedActivity?.maxParticipants || 10})
            </h2>
            <button
              type="button"
              onClick={addParticipant}
              disabled={!selectedActivity || fields.length >= (selectedActivity?.maxParticipants || 10)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Ajouter un participant
            </button>
          </div>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Participant {index + 1}</h3>
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

          {methods.formState.errors.participants && (
            <p className="text-red-500 text-sm mt-2">
              {methods.formState.errors.participants.message?.toString()}
            </p>
          )}
        </div>

        {/* Section 5: Demandes spéciales */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Demandes spéciales</h2>
          <Textarea
            name="specialRequests"
            placeholder="Informations supplémentaires, allergies, préférences..."
            rows={4}
          />
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={bookingMutation.isPending}
            className="px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-lg font-semibold"
          >
            {bookingMutation.isPending ? 'Envoi en cours...' : 'Réserver maintenant'}
          </button>
        </div>

        {/* Affichage des messages d'état */}
        {bookingMutation.isError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">Erreur lors de la réservation. Veuillez réessayer.</p>
          </div>
        )}

        {bookingMutation.isSuccess && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-700">Réservation créée avec succès !</p>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default ReservationForm; 