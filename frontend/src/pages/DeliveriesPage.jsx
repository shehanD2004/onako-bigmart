import React, { useState } from 'react';
import DeliveryList from '../components/deliveries/DeliveryList';
import DeliveryForm from '../components/deliveries/DeliveryForm';
import DeliveryDetails from '../components/deliveries/DeliveryDetails';

const DeliveriesPage = () => {
  const [view, setView] = useState('list');
  const [selectedDeliveryId, setSelectedDeliveryId] = useState(null);

  const handleEdit = (id) => {
    setSelectedDeliveryId(id);
    setView(id ? 'edit' : 'create');
  };

  const handleView = (id) => {
    setSelectedDeliveryId(id);
    setView('view');
  };

  const handleSuccess = () => {
    setView('list');
    setSelectedDeliveryId(null);
  };

  const handleCancel = () => {
    setView('list');
    setSelectedDeliveryId(null);
  };

  const handleBack = () => {
    setView('list');
    setSelectedDeliveryId(null);
  };

  return (
    <div>
      {view === 'list' && (
        <DeliveryList onEdit={handleEdit} onView={handleView} />
      )}
      {view === 'create' && (
        <DeliveryForm onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
      {view === 'edit' && (
        <DeliveryForm deliveryId={selectedDeliveryId} onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
      {view === 'view' && (
        <DeliveryDetails deliveryId={selectedDeliveryId} onEdit={handleEdit} onBack={handleBack} />
      )}
    </div>
  );
};

export default DeliveriesPage;