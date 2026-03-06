import React, { useState, useEffect } from 'react';
import { fetchDelivery, fetchPurchaseOrders } from '../../services/api';
import toast from 'react-hot-toast';

const DeliveryDetails = ({ deliveryId, onEdit, onBack }) => {
  const [delivery, setDelivery] = useState(null);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [deliveryId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [deliveryData, ordersData] = await Promise.all([
        fetchDelivery(deliveryId),
        fetchPurchaseOrders(),
      ]);
      setDelivery(deliveryData);
      setPurchaseOrders(ordersData);
    } catch (error) {
      toast.error('Failed to load delivery details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!delivery) {
    return <div className="text-center py-12 text-gray-500">Delivery not found</div>;
  }

  const po = purchaseOrders.find((p) => p._id === delivery.supplier);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Delivery Details</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(delivery._id)}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            Edit
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Back
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Purchase Order</label>
          <p className="text-gray-900 font-semibold">{po?.supplier?.name || 'Unknown'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Delivery Date</label>
          <p className="text-gray-900 font-semibold">
            {new Date(delivery.deliveryDate).toLocaleDateString()}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Received By</label>
          <p className="text-gray-900 font-semibold">{delivery.receivedBy || '-'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
          <p className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
            delivery.status === 'completed' ? 'bg-green-100 text-green-800' :
            delivery.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {delivery.status}
          </p>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Notes</label>
          <p className="text-gray-900">{delivery.notes || '-'}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Items</h3>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Product ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Qty Received
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {delivery.items && delivery.items.length > 0 ? (
                delivery.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.product}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.quantityReceived}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.condition}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.notes || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No items
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;