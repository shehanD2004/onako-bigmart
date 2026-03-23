import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderDashboard from './components/OrderDashboard';
import CustomerTracking from './components/CustomerTracking';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Simple Navbar for Demo Navigation */}
        <nav className="p-4 bg-white border-b flex gap-4 justify-center">
          <Link to="/admin" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold">Staff Admin</Link>
          <Link to="/track" className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold">Customer View</Link>
        </nav>

        <Routes>
          <Route path="/admin" element={<OrderDashboard />} />
          <Route path="/track" element={<CustomerTracking />} />
          <Route path="/" element={
            <div className="text-center mt-20">
              <h1 className="text-4xl font-black">Onako Big Mart</h1>
              <p className="text-gray-500 mt-2">Select a portal to begin the demo.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;