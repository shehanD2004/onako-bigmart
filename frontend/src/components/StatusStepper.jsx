import React from 'react';

const StatusStepper = ({ currentStatus }) => {
  const steps = ['Received', 'Packing', 'Ready', 'Out for Delivery', 'Delivered'];
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="w-full py-8">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="relative flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${
                index <= currentIndex ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-gray-200 text-gray-300'
              }`}>
                {index + 1}
              </div>
              <div className="absolute top-12 text-[10px] font-black uppercase tracking-tighter text-gray-400 whitespace-nowrap">
                {step}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-auto border-t-4 transition-all duration-700 mx-2 rounded-full ${
                index < currentIndex ? 'border-blue-600' : 'border-gray-100'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatusStepper;