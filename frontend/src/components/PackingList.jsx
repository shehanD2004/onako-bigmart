import React, { useState } from 'react';

const PackingList = ({ orderItems }) => {
  const [packedItems, setPackedItems] = useState({});

  const toggleItem = (id) => {
    setPackedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const allPacked = orderItems.every(item => packedItems[item._id]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Packing Checklist</h3>
      <div className="space-y-3">
        {orderItems.map((item) => (
          <div key={item._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={packedItems[item._id] || false}
                onChange={() => toggleItem(item._id)}
              />
              <span className={`text-gray-700 ${packedItems[item._id] ? 'line-through text-gray-400' : ''}`}>
                {item.name} <span className="text-sm font-bold">x {item.quantity}</span>
              </span>
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              Shelf: {item.location || 'A1'}
            </span>
          </div>
        ))}
      </div>
      <button 
        disabled={!allPacked}
        className={`mt-6 w-full py-3 rounded-lg font-bold transition-all ${
          allPacked ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Mark as Ready for Dispatch
      </button>
    </div>
  );
};

export default PackingList;