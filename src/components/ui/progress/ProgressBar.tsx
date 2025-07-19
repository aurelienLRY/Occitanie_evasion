"use client";

import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar = ({ currentStep, totalSteps, className = '' }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full px-5 ${className}`}>
      <div className="flex items-center justify-center mb-2 px-5">
     
        <span className="text-sm text-gray-500 font-bold">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-1">
        <motion.div
          className="bg-secondary h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      
      {/* Indicateurs d'étapes */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index < currentStep 
                ? 'bg-secondary' 
                : index === currentStep - 1 
                ? 'bg-secondary/50' 
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar; 