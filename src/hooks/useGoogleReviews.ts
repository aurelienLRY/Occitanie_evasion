import { useState, useEffect } from 'react';

// Types pour les avis Google
export interface GoogleReview {
  id: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated?: boolean;
  language?: string;
}

export interface GooglePlaceData {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

interface UseGoogleReviewsProps {
  placeId: string;
  apiKey: string;
  maxReviews?: number;
}

interface UseGoogleReviewsReturn {
  data: GooglePlaceData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGoogleReviews = ({ 
  placeId, 
  apiKey, 
  maxReviews = 10 
}: UseGoogleReviewsProps): UseGoogleReviewsReturn => {
  const [data, setData] = useState<GooglePlaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      // URL de l'API Google Places
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=place_id,name,rating,user_ratings_total,reviews&key=${apiKey}&reviews_sort=newest&reviews_no_translations=true&reviews_language=fr`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.status !== 'OK') {
        throw new Error(`Erreur API Google: ${result.status} - ${result.error_message || 'Erreur inconnue'}`);
      }

      const placeData = result.result;
      
      // Limiter le nombre d'avis
      const limitedReviews = placeData.reviews?.slice(0, maxReviews) || [];

      setData({
        place_id: placeData.place_id,
        name: placeData.name,
        rating: placeData.rating || 0,
        user_ratings_total: placeData.user_ratings_total || 0,
        reviews: limitedReviews
      });

    } catch (err) {
      console.error('Erreur lors de la récupération des avis Google:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (placeId && apiKey) {
      fetchReviews();
    }
  }, [placeId, apiKey, maxReviews]);

  return {
    data,
    loading,
    error,
    refetch: fetchReviews
  };
};

// Hook simplifié pour les données statiques (pour les tests)
export const useMockGoogleReviews = (): UseGoogleReviewsReturn => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai de chargement
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const mockData: GooglePlaceData = {
    place_id: "mock_place_id",
    name: "Occitanie Évasion",
    rating: 4.8,
    user_ratings_total: 127,
    reviews: [
      {
        id: "1",
        author_name: "Marie Dubois",
        profile_photo_url: "https://placehold.co/48.png",
        rating: 5,
        relative_time_description: "il y a 2 semaines",
        text: "Expérience incroyable ! Florent est un guide exceptionnel qui nous a fait découvrir des endroits magnifiques. Le canyoning était à la fois sportif et sécurisé. Je recommande vivement !",
        time: Date.now() - 14 * 24 * 60 * 60 * 1000,
        translated: false,
        language: "fr"
      },
      {
        id: "2",
        author_name: "Thomas Martin",
        rating: 5,
        relative_time_description: "il y a 1 mois",
        text: "Super journée d'escalade avec Florent. Il s'adapte parfaitement au niveau de chacun et crée une ambiance conviviale. Les spots sont magnifiques et bien choisis.",
        time: Date.now() - 30 * 24 * 60 * 60 * 1000,
        translated: false,
        language: "fr"
      },
      {
        id: "3",
        author_name: "Sophie Bernard",
        profile_photo_url: "https://placehold.co/48.png",
        rating: 4,
        relative_time_description: "il y a 2 mois",
        text: "Très belle expérience en spéléologie. Florent est professionnel et rassurant. Le matériel est de qualité et les explications sont claires. Un peu court pour le prix mais l'expérience vaut le coup.",
        time: Date.now() - 60 * 24 * 60 * 60 * 1000,
        translated: false,
        language: "fr"
      },
      {
        id: "4",
        author_name: "Pierre Durand",
        rating: 5,
        relative_time_description: "il y a 3 mois",
        text: "Via corda fantastique ! Vue imprenable et sensations garanties. Florent est un guide expérimenté qui met en confiance. Je recommande pour tous les niveaux.",
        time: Date.now() - 90 * 24 * 60 * 60 * 1000,
        translated: false,
        language: "fr"
      },
      {
        id: "5",
        author_name: "Emma Rousseau",
        profile_photo_url: "https://placehold.co/48.png",
        rating: 5,
        relative_time_description: "il y a 4 mois",
        text: "Première fois en canyoning et c'était parfait ! Florent est patient et explique tout en détail. L'activité est accessible même pour les débutants. Je reviendrai !",
        time: Date.now() - 120 * 24 * 60 * 60 * 1000,
        translated: false,
        language: "fr"
      },
      {
        id: "6",
        author_name: "Lucas Moreau",
        rating: 4,
        relative_time_description: "il y a 5 mois",
        text: "Escalade en falaise magnifique. Florent connaît parfaitement les sites et s'adapte au niveau. Belle progression technique et ambiance sympa.",
        time: Date.now() - 150 * 24 * 60 * 60 * 1000,
        translated: false,
        language: "fr"
      }
    ]
  };

  return {
    data: loading ? null : mockData,
    loading,
    error: null,
    refetch: () => {}
  };
}; 