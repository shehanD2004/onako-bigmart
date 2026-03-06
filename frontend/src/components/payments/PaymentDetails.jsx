import React, { useState, useEffect } from 'react';
import { fetchPayment, fetchSuppliers, fetchPurchaseOrders } from '../../services/api';
import toast from 'react-hot-toast';

const PaymentDetails = ({ paymentId, onEdit, onBack }) => {
  const [payment, setPayment] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [paymentId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [paymentData, suppliersData, ordersData] = await Promise.all([
        fetchPayment(paymentId),
        fetchSuppliers(),
        fetchPurchaseOrders(),
      ]);
      setPayment(paymentData);
      setSuppliers(suppliersData);
      setPurchaseOrders(ordersData);
    } catch (error) {
      toast.error('Failed to load payment details');
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

  if (!payment) {
    return <div className="text-center py-12 text-gray-500">Payment not found</div>;
  }

  const supplier = suppliers.find((s) => s._id === payment.supplier);
  const po = purchaseOrders.find((p) => p._id === payment.purchaseOrder);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(payment._id)}
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

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Invoice Number</label>
          <p className="text-gray-900 font-semibold font-mono">{payment.invoiceNumber}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Supplier</label>
          <p className="text-gray-900 font-semibold">{supplier?.name || 'Unknown'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
          <p className="text-gray-900 font-semibold text-lg">${payment.amount}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Payment Date</label>
          <p className="text-gray-900 font-semibold">
            {new Date(payment.paymentDate || payment.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Payment Method</label>
          <p className="text-gray-900 font-semibold">{payment.paymentMethod || '-'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
          <p className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
            payment.status === 'completed' ? 'bg-green-100 text-green-800' :
            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {payment.status}
          </p>
        </div>

        {payment.purchaseOrder && (
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Associated Purchase Order
            </label>
            <p className="text-gray-900 font-semibold">{po?.supplier?.name || 'Unknown'}</p>
          </div>
        )}

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Notes</label>
          <p className="text-gray-900">{payment.notes || '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;