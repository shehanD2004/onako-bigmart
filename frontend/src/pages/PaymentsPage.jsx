import React, { useState } from 'react';
import PaymentList from '../components/payments/PaymentList';
import PaymentForm from '../components/payments/PaymentForm';
import PaymentDetails from '../components/payments/PaymentDetails';

const PaymentsPage = () => {
  const [view, setView] = useState('list'); // 'list', 'create', 'edit', 'view'
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  const handleEdit = (id) => {
    setSelectedPaymentId(id);
    setView(id ? 'edit' : 'create');
  };

  const handleView = (id) => {
    setSelectedPaymentId(id);
    setView('view');
  };

  const handleSuccess = () => {
    setView('list');
    setSelectedPaymentId(null);
  };

  const handleCancel = () => {
    setView('list');
    setSelectedPaymentId(null);
  };

  const handleBack = () => {
    setView('list');
    setSelectedPaymentId(null);
  };

  return (
    <div>
      {view === 'list' && (
        <PaymentList onEdit={handleEdit} onView={handleView} />
      )}
      {view === 'create' && (
        <PaymentForm onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
      {view === 'edit' && (
        <PaymentForm paymentId={selectedPaymentId} onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
      {view === 'view' && (
        <PaymentDetails paymentId={selectedPaymentId} onEdit={handleEdit} onBack={handleBack} />
      )}
    </div>
  );
};

export default PaymentsPage;