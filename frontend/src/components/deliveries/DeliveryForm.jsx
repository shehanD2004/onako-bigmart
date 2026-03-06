import React, { useState, useEffect } from 'react';
import { fetchPurchaseOrders, fetchDelivery, createDelivery, updateDelivery } from '../../services/api';
import { TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const DeliveryForm = ({ deliveryId, onSuccess, onCancel }) => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    supplier: '',
    deliveryDate: '',
    receivedBy: '',
    items: [{ product: '', quantityReceived: '', condition: 'good', notes: '' }],
    status: 'pending',
    notes: '',
  });

  useEffect(() => {
    loadPurchaseOrders();
    if (deliveryId) {
      loadDelivery();
    }
  }, [deliveryId]);

  const loadPurchaseOrders = async () => {
    try {
      const data = await fetchPurchaseOrders();
      setPurchaseOrders(data);
    } catch (error) {
      toast.error('Failed to load purchase orders');
      console.error(error);
    }
  };

  const loadDelivery = async () => {
    setLoading(true);
    try {
      const data = await fetchDelivery(deliveryId);
      setFormData({
        supplier: data.supplier,
        deliveryDate: data.deliveryDate?.split('T')[0] || '',
        receivedBy: data.receivedBy || '',
        items: data.items || [{ product: '', quantityReceived: '', condition: 'good', notes: '' }],
        status: data.status || 'pending',
        notes: data.notes || '',
      });
    } catch (error) {
      toast.error('Failed to load delivery');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: '', quantityReceived: '', condition: 'good', notes: '' }],
    });
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.supplier || !formData.deliveryDate || formData.items.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        supplier: formData.supplier,
        deliveryDate: formData.deliveryDate,
        receivedBy: formData.receivedBy,
        items: formData.items.map((item) => ({
          product: item.product,
          quantityReceived: parseInt(item.quantityReceived) || 0,
          condition: item.condition,
          notes: item.notes,
        })),
        status: formData.status,
        notes: formData.notes,
      };

      if (deliveryId) {
        await updateDelivery(deliveryId, payload);
        toast.success('Delivery updated successfully');
      } else {
        await createDelivery(payload);
        toast.success('Delivery created successfully');
      }

      onSuccess();
    } catch (error) {
      toast.error(deliveryId ? 'Failed to update delivery' : 'Failed to create delivery');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {deliveryId ? 'Edit Delivery' : 'Create New Delivery'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Order *
            </label>
            <select
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select a purchase order</option>
              {purchaseOrders.map((po) => (
                <option key={po._id} value={po._id}>
                  {po.supplier?.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Date *
            </label>
            <input
              type="date"
              value={formData.deliveryDate}
              onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Received By
            </label>
            <input
              type="text"
              value={formData.receivedBy}
              onChange={(e) => setFormData({ ...formData, receivedBy: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="partial">Partial</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="3"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-bold text-gray-700">Delivery Items *</label>
            <button
              type="button"
              onClick={addItem}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600">Product ID *</label>
                  <input
                    type="text"
                    value={item.product}
                    onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600">Qty Received</label>
                  <input
                    type="number"
                    min="0"
                    value={item.quantityReceived}
                    onChange={(e) => handleItemChange(index, 'quantityReceived', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600">Condition</label>
                  <select
                    value={item.condition}
                    onChange={(e) => handleItemChange(index, 'condition', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  >
                    <option value="good">Good</option>
                    <option value="damaged">Damaged</option>
                    <option value="partial">Partial</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center justify-center gap-1"
                  >
                    <TrashIcon className="w-4 h-4" /> Remove
                  </button>
                </div>

                <div className="md:col-span-4">
                  <label className="text-xs font-medium text-gray-600">Notes</label>
                  <input
                    type="text"
                    value={item.notes}
                    onChange={(e) => handleItemChange(index, 'notes', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;