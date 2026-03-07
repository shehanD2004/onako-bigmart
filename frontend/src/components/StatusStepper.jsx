import React from 'react';
import { CheckCircleIcon, TruckIcon, GiftIcon, ClockIcon } from '@heroicons/react/24/solid';

const statuses = ['Pending', 'Packing', 'Out for Delivery', 'Delivered'];

const StatusStepper = ({ currentStatus, onAdvance }) => {
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
        ></div>

        {statuses.map((status, index) => (
          <div key={status} className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${
              index <= currentIndex ? 'bg-blue-600 border-blue-200 text-white' : 'bg-white border-gray-200 text-gray-400'
            }`}>
              {index === 0 && <ClockIcon className="w-5 h-5" />}
              {index === 1 && <GiftIcon className="w-5 h-5" />}
              {index === 2 && <TruckIcon className="w-5 h-5" />}
              {index === 3 && <CheckCircleIcon className="w-5 h-5" />}
            </div>
            <span className={`text-xs mt-2 font-bold ${index <= currentIndex ? 'text-blue-800' : 'text-gray-400'}`}>
              {status}
            </span>
          </div>
        ))}
      </div>
      
      {currentIndex < statuses.length - 1 && (
        <button 
          onClick={onAdvance}
          className="mt-8 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded shadow-lg transition"
        >
          Advance to {statuses[currentIndex + 1]}
        </button>
      )}
    </div>
  );
};

export default StatusStepper;