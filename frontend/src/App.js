import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Orders from './pages/Orders';
import OrderHistory from './pages/OrderHistory';
import CustomerOrder from './pages/CustomerOrder'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/orders" />} />
        
        {/* Admin Pages */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/history" element={<OrderHistory />} />
        
        {/* Customer page*/}
        <Route path="/track-order" element={<CustomerOrder />} />
      </Routes>
    </Router>
  );
}

export default App;