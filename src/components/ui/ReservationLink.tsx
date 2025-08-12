"use client";

import Link from 'next/link';
import { ReservationLinkProps } from '@/types/reservation.types';

const ReservationLink = ({ 
  children, 
  activity, 
  lieux, 
  sessionType, 
  className = "",
  onClick 
}: ReservationLinkProps) => {
  // Construction des paramètres d'URL
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    
    if (activity) params.append('activity', activity);
    if (lieux) params.append('lieux', lieux);
    if (sessionType) params.append('sessionType', sessionType);
    
    return params.toString();
  };

  const queryString = buildQueryParams();
  const href = queryString ? `/reservation?${queryString}` : '/reservation';

  return (
    <Link 
      href={href}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default ReservationLink;
ReservationLink.displayName = "ReservationLink";
