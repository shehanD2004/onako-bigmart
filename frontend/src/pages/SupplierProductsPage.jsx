import React, { useState } from 'react';
import SupplierProductList from '../components/supplierProducts/SupplierProductList';
import SupplierProductForm from '../components/supplierProducts/SupplierProductForm';
import SupplierProductDetails from '../components/supplierProducts/SupplierProductDetails';

const SupplierProductsPage = () => {
  const [view, setView] = useState('list');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleEdit = (id) => {
    setSelectedProductId(id);
    setView(id ? 'edit' : 'create');
  };

  const handleView = (id) => {
    setSelectedProductId(id);
    setView('view');
  };

  const handleSuccess = () => {
    setView('list');
    setSelectedProductId(null);
  };

  const handleCancel = () => {
    setView('list');
    setSelectedProductId(null);
  };

  const handleBack = () => {
    setView('list');
    setSelectedProductId(null);
  };

  return (
    <div>
      {view === 'list' && (
        <SupplierProductList onEdit={handleEdit} onView={handleView} />
      )}
      {view === 'create' && (
        <SupplierProductForm onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
      {view === 'edit' && (
        <SupplierProductForm productId={selectedProductId} onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
      {view === 'view' && (
        <SupplierProductDetails productId={selectedProductId} onEdit={handleEdit} onBack={handleBack} />
      )}
    </div>
  );
};

export default SupplierProductsPage;