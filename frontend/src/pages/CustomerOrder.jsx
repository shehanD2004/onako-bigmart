import React from 'react';
import { 
  CheckCircleIcon, 
  ShoppingBagIcon, 
  MapPinIcon, 
  CreditCardIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const CustomerOrder = () => {
  // dummy data
  const orderDetails = {
    id: "ORD-2026-991",
    date: "March 8, 2026",
    status: "Packing", 
    total: 5250.00,
    items: [
      { name: "Keells Sugar 1kg", qty: 2, price: 500 },
      { name: "Anchor Milk Powder 400g", qty: 1, price: 1100 },
      { name: "Munchee Super Cream Cracker", qty: 3, price: 540 }
    ],
    address: "No. 45/A, Temple Road, Near Clock Tower"
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans pb-12">
      {/* Navbar */}
      <nav className="bg-white shadow-sm p-4 mb-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-blue-600 flex items-center gap-1 font-bold text-sm">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Shop
          </Link>
          <span className="font-black text-xl text-blue-900 italic">BigMart</span>
          <div className="w-10"></div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4">
        {/* Order Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
            <CheckCircleIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-500">Thank you for shopping with BigMart</p>
        </div>

        {/* Live Status Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100 mb-6 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
            <h3 className="text-sm font-black text-blue-800 uppercase tracking-widest mb-4">Live Order Status</h3>
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-center opacity-100">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white ring-4 ring-blue-100">
                        <ShoppingBagIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold mt-2 text-blue-700">PLACED</span>
                </div>
                <div className="h-0.5 flex-1 bg-blue-600 mx-2"></div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white ring-4 ring-blue-100 animate-pulse">
                        <CheckCircleIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold mt-2 text-blue-700">PACKING</span>
                </div>
                <div className="h-0.5 flex-1 bg-gray-200 mx-2"></div>
                <div className="flex flex-col items-center opacity-30">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        <MapPinIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold mt-2">DELIVERY</span>
                </div>
            </div>
            <p className="text-center mt-6 text-sm font-medium text-gray-600">
                Your items are being carefully packed by our team.
            </p>
        </div>

        {/* Bill / Summary Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b bg-gray-50/50">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Order Summary</span>
              <span className="text-xs font-bold text-blue-600">#{orderDetails.id}</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4 mb-6">
              {orderDetails.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">{item.qty}x {item.name}</span>
                  <span className="text-gray-900 font-bold">Rs. {item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900 font-medium">Rs. 5,140.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="text-gray-900 font-medium">Rs. 110.00</span>
              </div>
              <div className="flex justify-between text-lg font-black mt-4 text-blue-900 pt-2 border-t border-gray-100">
                <span>Total Amount</span>
                <span>Rs. {orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-blue-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
                <CreditCardIcon className="w-6 h-6 text-yellow-400" />
                <div>
                    <p className="text-[10px] font-bold text-blue-300 uppercase">Payment Method</p>
                    <p className="text-sm font-bold">Cash on Delivery</p>
                </div>
            </div>
            <div className="text-right text-[10px] font-medium text-blue-200">
                <p>Delivery to:</p>
                <p className="font-bold text-white">Saman Kumara</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrder;