import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserGroupIcon,
  DocumentCurrencyDollarIcon,
  TruckIcon,
  ShoppingCartIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/suppliers', label: 'Suppliers', icon: UserGroupIcon },
    { path: '/purchase-orders', label: 'Purchase Orders', icon: ShoppingCartIcon },
    { path: '/supplier-products', label: 'Supplier Products', icon: DocumentCurrencyDollarIcon },
    { path: '/deliveries', label: 'Deliveries', icon: TruckIcon },
    { path: '/payments', label: 'Payments', icon: CreditCardIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {sidebarOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white h-screen overflow-y-auto transition-transform duration-300 z-40`}
      >
        <div className="p-6 border-b border-blue-600">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <HomeIcon className="w-8 h-8" />
            BigMart
          </h1>
          <p className="text-sm text-blue-200 mt-1">Procurement System</p>
        </div>

        <nav className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600 border-r-4 border-yellow-400'
                    : 'hover:bg-blue-600/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-md p-6 md:p-8 mt-12 md:mt-0">
          <h2 className="text-3xl font-bold text-gray-900">Procurement & Inventory Management</h2>
          <p className="text-gray-600 mt-1">Manage suppliers, purchase orders, and inventory</p>
        </header>

        {/* Page content */}
        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;