import Image from "next/image";
import { ISession } from "@/types";
import { MapPinIcon, CalendarIcon, ClockIcon, UsersIcon, Info } from "lucide-react";
import { isReduced as isReducedUtils } from "@/lib/utils";

interface IsBookingCardProps {
  session: ISession;
  onSpotInfoClick: (session: ISession) => void;
  onBookSessionClick: (session: ISession) => void;
}

// Mapping explicite des noms d'activités vers les noms de fichiers SVG
const getActivityIconPath = (activityName: string): string => {
  const normalizedName = activityName.toLowerCase().trim();
  
  // Mapping explicite pour éviter les problèmes de correspondance
  const iconMapping: Record<string, string> = {
    'canyoning': '_IconCanyoning.svg',
    'escalade': '_IconEscalade-simply.svg',
    'spéléologie': '_IconSpeleo-simply.svg',
    'speleologie': '_IconSpeleo-simply.svg',
    'spéléo': '_IconSpeleo-simply.svg',
    'speleo': '_IconSpeleo-simply.svg',
    'via corda': '_IconViaCorda-simply.svg',
    'viacorda': '_IconViaCorda-simply.svg',
    'via-corda': '_IconViaCorda-simply.svg'
  };
  
  // Essayer d'abord le mapping exact
  if (iconMapping[normalizedName]) {
    return `/icon/${iconMapping[normalizedName]}`;
  }
  
  // Fallback : essayer de trouver une correspondance partielle
  for (const [key, value] of Object.entries(iconMapping)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return `/icon/${value}`;
    }
  }
  
  // Fallback par défaut
  return '/icon/_IconCanyoning.svg';
};



const IsBookingCard = ({ session, onSpotInfoClick, onBookSessionClick }: IsBookingCardProps) => {


    const handleSpotInfoClick = () => {
        onSpotInfoClick(session);
    };

    const handleBookSessionClick = () => {
        onBookSessionClick(session);
    };


    const isReduced = isReducedUtils(session);
    
    // Obtenir le chemin de l'icône
    const iconPath = getActivityIconPath(session.activity.name);

    return (
        <div className='relative  shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group'>
            {isReduced && (
                <div className="">
                    <div className="relative">
                        <div
                            className="absolute translate-y-1/2 -top-1 -left-10"
                            style={{
                                width: '140px',
                                height: '32px',
                                transform: 'rotate(-45deg)',
                                background: 'linear-gradient(90deg, #38b48e 0%, #4ade80 100%)',
                                boxShadow: '0 2px 8px rgba(56,180,142,0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <span className="text-white font-bold text-xs tracking-wider w-full text-center" style={{letterSpacing: '1px'}}>Prix réduit</span>
                        </div>
                    </div>
                </div>
            )}
            
            <div className='p-4 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white rounded-lg px-4'>
                    <Image 
                        src={iconPath} 
                        alt={session.activity.name} 
                        width={200} 
                        height={200}
                        className='absolute -right-5 top-1/2 -translate-y-1/2  h-full object-cover opacity-30 overflow-hidden group-hover:opacity-20 transition-all duration-300'
                    />
                <div className='flex flex-col gap-1 px-4  py-2 w-full z-10'>
                    <h3 className='!text-3xl text-left'>{session.activity.name.trim()}</h3>
                    
                    {/* Lieu cliquable avec bouton info */}
                    <div className="flex items-center gap-2">
                        <MapPinIcon className='w-4 h-4 text-secondary' />
                        <span className="text-sm">: {session.spot.name}</span>
                        <button
                            type="button"
                            onClick={handleSpotInfoClick}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm transition-colors"
                            title="Voir les informations du lieu"
                        >
                            <Info className="w-3 h-3" />
                        </button>
                    </div>
                    
                    <p className='text-sm text-gray-600 flex items-center gap-2'>
                        <CalendarIcon className='w-4 h-4 text-secondary' />
                        : {new Date(session.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                    
                    <p className='text-sm text-gray-600 flex items-center gap-2'>
                        <ClockIcon className='w-4 h-4 text-secondary' />
                        : {session.startTime} - {session.endTime}
                    </p>
                    
                    <p className='text-sm text-gray-600 flex items-center gap-2'>
                        <UsersIcon className='w-4 h-4 text-secondary' />
                        : {session.placesMax - session.placesReserved} places restantes
                    </p>
                </div>
              

                <button 
                    className='bg-secondary text-white px-6 mr-6 py-2 rounded-lg group-hover:scale-110 transition-all duration-300 z-30' 
                    onClick={handleBookSessionClick}
                >
                    Participer
                </button>
         
            </div>
        </div>
    );
};

export default IsBookingCard;
IsBookingCard.displayName = "IsBookingCard";