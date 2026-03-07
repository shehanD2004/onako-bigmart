import React from 'react';

const PackingList = ({ items, onTogglePack }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-bold text-gray-900">Packing Checklist</h3>
      </div>
      <ul className="divide-y divide-gray-100">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center p-4 hover:bg-gray-50">
            <input
              type="checkbox"
              checked={item.isPacked}
              onChange={() => onTogglePack(idx)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="ml-4 flex-1">
              <p className={`text-sm font-medium ${item.isPacked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                {item.name}
              </p>
              <p className="text-xs text-gray-500">Qty: {item.quantity} | ${item.unitPriceAtSale} ea</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackingList;