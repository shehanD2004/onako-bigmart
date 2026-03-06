import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import SuppliersPage from './pages/SuppliersPage';
import PurchaseOrdersPage from './pages/PurchaseOrdersPage';
import SupplierProductsPage from './pages/SupplierProductsPage';
import DeliveriesPage from './pages/DeliveriesPage';
import PaymentsPage from './pages/PaymentsPage';

function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/suppliers" replace />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
            <Route path="/supplier-products" element={<SupplierProductsPage />} />
            <Route path="/deliveries" element={<DeliveriesPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="*" element={<Navigate to="/suppliers" replace />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;