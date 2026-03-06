import React, { useState } from 'react';
import Suppliers from './Suppliers';
import PurchaseOrders from './PurchaseOrders';
import SupplierProducts from './SupplierProducts';
import Deliveries from './Deliveries';
import Payments from './Payments';
import '../styles/SupplierManagement.css';

function SupplierManagement() {
  const [activeTab, setActiveTab] = useState('suppliers');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'suppliers':
        return <Suppliers />;
      case 'purchaseOrders':
        return <PurchaseOrders />;
      case 'supplierProducts':
        return <SupplierProducts />;
      case 'deliveries':
        return <Deliveries />;
      case 'payments':
        return <Payments />;
      default:
        return <div>Select a tab to view content.</div>;
    }
  };

  return (
    <div className="supplier-management-container">
      <div className="header">
        <h1>Supplier Management System</h1>
        <p>Manage your suppliers, purchase orders, products, deliveries, and payments here.</p>
      </div>
      
      <div className="tabs-navigation">
        <button 
          className={`tab-button ${activeTab === 'suppliers' ? 'active' : ''}`}
          onClick={() => setActiveTab('suppliers')}
        >
          <span className="tab-icon">👥</span> Suppliers
        </button>
        <button 
          className={`tab-button ${activeTab === 'purchaseOrders' ? 'active' : ''}`}
          onClick={() => setActiveTab('purchaseOrders')}
        >
          <span className="tab-icon">📋</span> Purchase Orders
        </button>
        <button 
          className={`tab-button ${activeTab === 'supplierProducts' ? 'active' : ''}`}
          onClick={() => setActiveTab('supplierProducts')}
        >
          <span className="tab-icon">📦</span> Supplier Products
        </button>
        <button 
          className={`tab-button ${activeTab === 'deliveries' ? 'active' : ''}`}
          onClick={() => setActiveTab('deliveries')}
        >
          <span className="tab-icon">🚚</span> Deliveries
        </button>
        <button 
          className={`tab-button ${activeTab === 'payments' ? 'active' : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          <span className="tab-icon">💳</span> Payments
        </button>
      </div>
      
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default SupplierManagement;