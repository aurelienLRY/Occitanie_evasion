"use client";

import React from 'react';
import { IActivity  } from '@/types';
import { Clock, Users, Info } from 'lucide-react';
import Modal from './Modal';


interface ActivityInfoModalProps {
  activity: IActivity | null;
  isOpen: boolean;
  onClose: () => void;
}

const ActivityInfoModal: React.FC<ActivityInfoModalProps> = ({
  activity,
  isOpen,
  onClose
}) => {
  if (!activity) return null;


   console.log("activity",activity);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Informations sur ${activity.name}`}
      size="md"
    >

       
    
      <div className="space-y-6">
        {/* Description */}
        {activity.description && (
          <div className="space-y-2">
            <h4 className="font-semibold text-2xl text-gray-900 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-500" />
              Description
            </h4>
            <p className="text-gray-700 leading-relaxed ">{activity.description}</p>
          </div>
        )}

        {/* Formules et tarifs */}
        <div className="space-y-4">
          <h4 className="font-semibold text-2xl text-gray-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-green-500" />
            Formules et tarifs
          </h4>
          <div className="grid gap-3">
            {activity.half_day && (
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="space-y-1">
                  <div className="font-semibold text-green-800">Demi-journée</div>
                  <div className="text-sm text-green-600">{activity.duration.half}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-700">{activity.price_half_day.standard}€</div>
                  <div className="text-xs text-green-600">par personne</div>
                </div>
              </div>
            )}
            {activity.full_day && (
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="space-y-1">
                  <div className="font-semibold text-blue-800">Journée complète</div>
                  <div className="text-sm text-blue-600">{activity.duration.full}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-700">{activity.price_full_day.standard}€</div>
                  <div className="text-xs text-blue-600">par personne</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Participants */}
        <div className="space-y-2">
          <h4 className="font-semibold text-2xl text-gray-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-500" />
            Participants
          </h4>
          <div className="flex justify-around gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-600">Minimum</div>
              <div className="font-bold text-purple-700">{activity.min_OfPeople} personne(s)</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-600">Maximum</div>
              <div className="font-bold text-purple-700">{activity.max_OfPeople} personne(s)</div>
            </div>
            {activity.min_age && ( 
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-600">Age minimum</div>
              <div className="font-bold text-purple-700">{activity.min_age} ans</div>
            </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ActivityInfoModal; 