import React, { useState } from 'react';

const PackingList = ({ order, onBack }) => {
  const [packedItems, setPackedItems] = useState({});
  const toggleItem = (id) => setPackedItems(prev => ({ ...prev, [id]: !prev[id] }));
  const allPacked = order.items.every(item => packedItems[item.id]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-3xl mt-10 border border-gray-100">
      <button onClick={onBack} className="text-gray-400 mb-4 hover:text-blue-600 text-sm font-bold uppercase tracking-tighter">
        ← Back to Hub
      </button>
      <div className="mb-8">
        <h3 className="text-2xl font-black text-gray-900">Packing for {order.customer}</h3>
        <p className="text-sm text-blue-600 font-medium italic">Landmark: {order.landmark}</p>
      </div>
      <div className="space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-all">
            <div className="flex items-center space-x-4">
              <input 
                type="checkbox" 
                className="w-6 h-6 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500" 
                checked={packedItems[item.id] || false} 
                onChange={() => toggleItem(item.id)} 
              />
              <span className={`font-semibold ${packedItems[item.id] ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                {item.name} <span className="text-blue-600 ml-2">x{item.qty}</span>
              </span>
            </div>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-md uppercase tracking-widest">
              {item.shelf}
            </span>
          </div>
        ))}
      </div>
      <button 
        disabled={!allPacked} 
        className={`mt-10 w-full py-4 rounded-2xl font-black uppercase tracking-widest text-white shadow-lg transition-all ${
          allPacked ? 'bg-green-600 hover:bg-green-700 scale-[1.02]' : 'bg-gray-200 cursor-not-allowed text-gray-400'
        }`}
      >
        Ready for Dispatch
      </button>
    </div>
  );
};

export default PackingList;