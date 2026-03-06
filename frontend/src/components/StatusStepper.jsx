import React from 'react';
import { useState } from 'react';

const StatusStepper = ({ currentStatus }) => {
  const steps = ['Received', 'Packing', 'Ready', 'Out for Delivery', 'Delivered'];
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="w-full py-8">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="relative flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                index <= currentIndex ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {index + 1}
              </div>
              <div className="absolute top-12 text-xs font-medium text-gray-500 whitespace-nowrap">{step}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-auto border-t-2 transition-colors duration-500 ${
                index < currentIndex ? 'border-blue-600' : 'border-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatusStepper;