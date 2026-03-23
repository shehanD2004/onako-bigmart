import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerTracking = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h2 className="text-3xl font-black mb-6">Track Your Groceries</h2>
      <div className="grid gap-6">
        {orders.map(order => (
          <div key={order._id} className="p-6 bg-white rounded-2xl border shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{order.customer}</p>
                <p className="text-sm text-gray-400">Status: <span className="text-blue-600 font-bold uppercase">{order.status}</span></p>
              </div>
              <div className="text-2xl">📦</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTracking;