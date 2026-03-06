import React, { useState, useEffect } from 'react';
import { fetchSuppliers, fetchPurchaseOrders, fetchPayment, createPayment, updatePayment } from '../../services/api';
import toast from 'react-hot-toast';

const PaymentForm = ({ paymentId, onSuccess, onCancel }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    supplier: '',
    purchaseOrder: '',
    invoiceNumber: '',
    amount: '',
    paymentDate: '',
    paymentMethod: '',
    status: 'pending',
    notes: '',
  });

  useEffect(() => {
    loadSelectData();
    if (paymentId) {
      loadPayment();
    }
  }, [paymentId]);

  const loadSelectData = async () => {
    try {
      const [suppliersData, ordersData] = await Promise.all([
        fetchSuppliers(),
        fetchPurchaseOrders(),
      ]);
      setSuppliers(suppliersData);
      setPurchaseOrders(ordersData);
    } catch (error) {
      toast.error('Failed to load reference data');
      console.error(error);
    }
  };

  const loadPayment = async () => {
    setLoading(true);
    try {
      const data = await fetchPayment(paymentId);
      setFormData({
        supplier: data.supplier,
        purchaseOrder: data.purchaseOrder || '',
        invoiceNumber: data.invoiceNumber || '',
        amount: data.amount || '',
        paymentDate: data.paymentDate?.split('T')[0] || '',
        paymentMethod: data.paymentMethod || '',
        status: data.status || 'pending',
        notes: data.notes || '',
      });
    } catch (error) {
      toast.error('Failed to load payment');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.supplier || !formData.invoiceNumber || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        supplier: formData.supplier,
        purchaseOrder: formData.purchaseOrder || undefined,
        invoiceNumber: formData.invoiceNumber,
        amount: parseFloat(formData.amount),
        paymentDate: formData.paymentDate,
        paymentMethod: formData.paymentMethod,
        status: formData.status,
        notes: formData.notes,
      };

      if (paymentId) {
        await updatePayment(paymentId, payload);
        toast.success('Payment updated successfully');
      } else {
        await createPayment(payload);
        toast.success('Payment created successfully');
      }

      onSuccess();
    } catch (error) {
      toast.error(paymentId ? 'Failed to update payment' : 'Failed to create payment');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {paymentId ? 'Edit Payment' : 'Create New Payment'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplier *
            </label>
            <select
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select a supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Order (Optional)
            </label>
            <select
              value={formData.purchaseOrder}
              onChange={(e) => setFormData({ ...formData, purchaseOrder: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              Invoice Number *
            </label>
            <input
              type="text"
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Date
            </label>
            <input
              type="date"
              value={formData.paymentDate}
              onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <input
              type="text"
              placeholder="e.g., Bank Transfer, Check"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
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
              <option value="failed">Failed</option>
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

        <div className="flex gap-4 mt-6">
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

export default PaymentForm;