"use client";

import React from 'react';
import { ISpot } from '@/types';
import { MapPin, Info } from 'lucide-react';
import Modal from './Modal';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Import dynamique de la carte pour éviter les problèmes SSR
const MapCustomer = dynamic(() => import('../mapCustomer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Chargement de la carte...</div>
    </div>
  )
});

interface SpotInfoModalProps {
  spot: ISpot | null;
  isOpen: boolean;
  onClose: () => void;
}

const SpotInfoModal: React.FC<SpotInfoModalProps> = ({
  spot,
  isOpen,
  onClose
}) => {
  if (!spot) return null;



  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Informations sur ${spot.name}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* En-tête avec icône */}
        {/* <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="p-3 bg-green-100 rounded-full">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{spot.name}</h3>
            <p className="text-gray-600">Lieu de pratique</p>
          </div>
        </div> */}

     {/* Photo du lieu - Non disponible dans SpotFormData */}
         {spot.photo && (  
            <div className="relative w-full aspect-3/2 rounded-lg overflow-hidden">
              <Image
                src={spot.photo}
                alt={`Photo de ${spot.name}`}
                fill
                className="w-full h-full object-cover"
              />
            </div>
        )} 

        {/* Description */}
        {spot.description && (
          <div className="space-y-2">
            <h4 className="font-semibold text-2xl text-gray-900 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-500" />
              Description
            </h4>
            <p className="text-gray-700 leading-relaxed">{spot.description}</p>
          </div>
        )}

   

        {/* Carte */}
        <div className="space-y-2">
          <h4 className="font-semibold text-2xl text-gray-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-500" />
            Localisation
          </h4>
          <div className="w-full h-80 rounded-lg overflow-hidden border border-gray-200">
            <MapCustomer spots={[spot]} />
          </div>
        </div>


      </div>
    </Modal>
  );
};

export default SpotInfoModal; 