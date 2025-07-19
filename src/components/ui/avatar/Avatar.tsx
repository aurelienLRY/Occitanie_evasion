"use client";

import Image from 'next/image';
import { useState } from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  seed: string;
  size?: number;
  style?: 'adventurer' | 'avataaars' | 'big-ears' | 'big-smile' | 'bottts' | 'croodles' | 'fun-emoji' | 'initials' | 'lorelei' | 'micah' | 'miniavs' | 'notionists' | 'open-peeps' | 'personas' | 'pixel-art' | 'rings' | 'shapes' | 'thumbs';
  className?: string;
  fallback?: React.ReactNode;
}

const Avatar = ({ 
  seed, 
  size = 48, 
  style = 'adventurer',
  className = '',
  fallback
}: AvatarProps) => {
  const [error, setError] = useState(false);
  
  const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&size=${size}`;
  
  const defaultFallback = (
    <div 
      className={`bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <User className="w-1/2 h-1/2" />
    </div>
  );

  if (error) {
    return fallback || defaultFallback;
  }

  return (
    <Image
      src={avatarUrl}
      alt={`Avatar pour ${seed}`}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
      onError={() => setError(true)}
    />
  );
};

export default Avatar; 