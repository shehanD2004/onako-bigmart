import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, TruckIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const OrderHistory = () => {
  const historyData = [
    { id: "ORD-2026-980", customer: "Anura Silva", date: "2026-03-05", amount: "Rs. 4,500.00", status: "Delivered" },
    { id: "ORD-2026-975", customer: "Priya Perera", date: "2026-03-04", amount: "Rs. 1,250.00", status: "Delivered" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-950 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <HomeIcon className="w-8 h-8 text-yellow-400" /> BigMart
          </h1>
          <p className="text-xs text-blue-300 mt-1 font-semibold uppercase tracking-widest">Delivery Console</p>
        </div>
        <nav className="mt-6">
          <Link to="/orders" className="flex items-center gap-3 px-6 py-4 hover:bg-blue-800 transition-colors text-blue-200">
            <TruckIcon className="w-5 h-5" />
            <span>Active Orders</span>
          </Link>
          <Link to="/history" className="flex items-center gap-3 px-6 py-4 bg-blue-700 border-r-4 border-yellow-400">
            <ShoppingBagIcon className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">Order History</span>
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <div className="flex-1">
        <header className="bg-white shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Order History</h2>
          <p className="text-gray-500 text-sm">Dashboard / History</p>
        </header>
        <main className="p-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {historyData.map((row) => (
                  <tr key={row.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-900">{row.id}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{row.customer}</td>
                    <td className="px-6 py-4 text-gray-600">{row.amount}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderHistory;