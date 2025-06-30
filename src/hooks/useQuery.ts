"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchService } from '@/lib/fetch.service';
import API_ROUTES from '@/config/Api';
import { IActivity, ISpot, ISession } from '@/types';
import { IBooking } from '@/types/reservation.type';

// Types pour les réponses API
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Configuration par défaut pour les queries
const defaultQueryConfig = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)
  retry: 2, // Réduit le nombre de retry
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 10000),
  refetchOnWindowFocus: false, // Désactive le refetch automatique
  refetchOnMount: false, // Désactive le refetch au montage
};

// Configuration pour les sessions (plus fréquentes)
const sessionQueryConfig = {
  staleTime: 2 * 60 * 1000, // 2 minutes
  gcTime: 5 * 60 * 1000, // 5 minutes
  retry: 1, // Réduit encore plus
  retryDelay: (attemptIndex: number) => Math.min(2000 * 2 ** attemptIndex, 8000),
  refetchOnWindowFocus: false,
  refetchOnMount: false,
};

// Hook générique pour les requêtes GET
function useApiQuery<T = unknown>(
  queryKey: string[],
  url: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
    retry?: number;
  }
) {
  return useQuery({
    queryKey,
    queryFn: async (): Promise<T> => {
      try {
        const response = await fetchService.get(url);        
        if (response.data && typeof response.data === 'object' && 'data' in response.data) {
          return response.data.data as T;
        }
        
        // Fallback si la structure est différente
        return response.data as T;
      } catch (error) {
        console.error(`Erreur API pour ${queryKey.join('-')}:`, error);
        throw error;
      }
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? defaultQueryConfig.staleTime,
    gcTime: options?.gcTime ?? defaultQueryConfig.gcTime,
    retry: options?.retry ?? defaultQueryConfig.retry,
    retryDelay: defaultQueryConfig.retryDelay,
  });
}

// Hook pour récupérer toutes les activités
export const useActivities = () => {
  return useApiQuery<IActivity[]>(['activities'], API_ROUTES.ACTIVITIES);
};

// Hook pour récupérer tous les spots
export const useSpots = () => {
  return useApiQuery<ISpot[]>(['spots'], API_ROUTES.SPOTS);
};

// Hook pour récupérer toutes les sessions actives
export const useActiveSessions = () => {
  return useApiQuery<ISession[]>(
    ['active-sessions'],
    API_ROUTES.ACTIVE_SESSIONS,
    {
      staleTime: sessionQueryConfig.staleTime,
      gcTime: sessionQueryConfig.gcTime,
      retry: sessionQueryConfig.retry,
    }
  );
};
export const useBooking = () => {
  return useApiMutation<IBooking, IBooking>(
    async (booking: IBooking) => {
      const response = await fetchService.post(API_ROUTES.BOOKING, booking);
      return response as ApiResponse<IBooking>;
    },
    {
      onSuccess: (data) => {
        console.log('Réservation créée avec succès:', data);
      },
      onError: (error) => {
        console.error('Erreur lors de la création de la réservation:', error);
      },
      invalidateQueries: [['active-sessions']],
    }
  );
};

// Hook pour les mutations (POST, PUT, DELETE)
export const useApiMutation = <TData = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    invalidateQueries?: string[][];
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalider les queries concernées
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }

      // Callback de succès
      if (options?.onSuccess) {
        options.onSuccess(data.data, variables);
      }
    },
    onError: (error, variables) => {
      console.error('Erreur mutation:', error);
      
      // Callback d'erreur
      if (options?.onError) {
        options.onError(error, variables);
      }
    },
  });
};





