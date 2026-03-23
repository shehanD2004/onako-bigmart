import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PackingList from './PackingList';

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // READ (CRUD): Fetching all orders from the backend
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // UPDATE (CRUD): Changing status from 'Packing' to 'Ready'
  const handleStatusUpdate = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status: 'Ready'
      });
      setSelectedOrder(null);
      fetchOrders(); // Refresh the list to show the new status
    } catch (error) {
      alert("Failed to update order status.");
    }
  };

  if (selectedOrder) {
    return (
      <PackingList 
        order={selectedOrder} 
        onBack={() => setSelectedOrder(null)} 
        onComplete={() => handleStatusUpdate(selectedOrder._id)}
      />
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Onako Admin Hub</h1>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Customer</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Landmark</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-800">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-500 italic">{order.landmark}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    order.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {order.status !== 'Ready' && (
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-100"
                    >
                      Fulfill Order
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDashboard;