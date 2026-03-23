import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserIcon, MapPinIcon, PhoneIcon, TruckIcon, 
  ClockIcon, GiftIcon, CheckCircleIcon, 
  HomeIcon, ShoppingBagIcon, SparklesIcon
} from '@heroicons/react/24/outline';

const Orders = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [order, setOrder] = useState({
    orderID: "ORD-2026-991",
    status: "Pending",
    paymentType: "Cash on Delivery",
    totalAmount: 5250.00,
    items: [
      { name: "Keells Sugar 1kg", quantity: 2, unitPriceAtSale: 250, isPacked: false },
      { name: "Anchor Milk Powder 400g", quantity: 1, unitPriceAtSale: 1100, isPacked: false },
      { name: "Munchee Super Cream Cracker", quantity: 3, unitPriceAtSale: 180, isPacked: false }
    ],
    customer: {
      name: "Saman Kumara",
      phoneNumber: "071-2345678",
      address: { houseNumber: "No. 45/A", street: "Temple Road", landMark: "Near Clock Tower" }
    }
  });

  const statuses = ['Pending', 'Packing', 'Out for Delivery', 'Delivered'];
  const currentIdx = statuses.indexOf(order.status);
  const allPacked = order.items.every(item => item.isPacked);

  const advanceStatus = () => {
    // Packing Stage validation 
    if (order.status === "Packing" && !allPacked) return;

    if (currentIdx < statuses.length - 1) {
      const nextStatus = statuses[currentIdx + 1];
      setOrder({ ...order, status: nextStatus });

      // shows "Delivered" Success Message 
      if (nextStatus === "Delivered") {
        setShowSuccess(true);
      }
    }
  };

  const togglePacked = (idx) => {
    const newItems = [...order.items];
    newItems[idx].isPacked = !newItems[idx].isPacked;
    setOrder({ ...order, items: newItems });
  };

  return (
    <div className="relative flex min-h-screen bg-gray-100 font-sans text-gray-900 overflow-hidden">
      
      {/* SUCCESS OVERLAY - shows only when Order is Delivered */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/90 backdrop-blur-sm transition-all duration-500">
          <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-sm mx-auto transform scale-110 border-4 border-yellow-400">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-12 h-12 text-green-600 animate-bounce" />
            </div>
            <h2 className="text-3xl font-black text-blue-900 mb-2">Success!</h2>
            <p className="text-gray-600 font-medium mb-8">Order <span className="text-blue-600 font-bold">{order.orderID}</span> has been successfully delivered.</p>
            <button 
              onClick={() => navigate('/history')}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              VIEW IN HISTORY
              <ShoppingBagIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-950 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <HomeIcon className="w-8 h-8 text-yellow-400" />
            BigMart
          </h1>
          <p className="text-xs text-blue-300 mt-1 font-semibold uppercase tracking-widest">Delivery Console</p>
        </div>

        <nav className="mt-6">
          <Link to="/orders" className="flex items-center gap-3 px-6 py-4 bg-blue-700 border-r-4 border-yellow-400 transition-all">
            <TruckIcon className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">Active Orders</span>
          </Link>
          <Link to="/history" className="flex items-center gap-3 px-6 py-4 hover:bg-blue-800 transition-colors cursor-pointer text-blue-200">
            <ShoppingBagIcon className="w-5 h-5" />
            <span>Order History</span>
          </Link>
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Orders Management</h2>
            <p className="text-gray-500 text-sm">Dashboard / Delivery Console</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Status</p>
            <span className={`inline-block mt-1 px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter ${
              order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {order.status}
            </span>
          </div>
        </header>

        <main className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              
              {/* Stepper Section */}
              <div className="p-8 border-b bg-gray-50/50">
                <div className="flex justify-between relative px-2">
                  <div className="absolute top-5 left-0 w-full h-1 bg-gray-200"></div>
                  <div 
                    className="absolute top-5 left-0 h-1 bg-blue-600 transition-all duration-700 ease-in-out"
                    style={{ width: `${(currentIdx / 3) * 100}%` }}
                  ></div>

                  {statuses.map((s, i) => (
                    <div key={s} className="z-10 flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        i <= currentIdx ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                         {i === 0 && <ClockIcon className="w-5 h-5"/>}
                         {i === 1 && <GiftIcon className="w-5 h-5"/>}
                         {i === 2 && <TruckIcon className="w-5 h-5"/>}
                         {i === 3 && <CheckCircleIcon className="w-5 h-5"/>}
                      </div>
                      <span className={`text-[10px] font-bold mt-2 uppercase tracking-tighter ${i <= currentIdx ? 'text-blue-700' : 'text-gray-400'}`}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                   <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                    Order Details <span className="text-gray-300 font-light">|</span> <span className="text-gray-500 text-base font-medium">{order.orderID}</span>
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100">
                    <SparklesIcon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">{order.paymentType}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Packing List */}
                  <div>
                    <h4 className="text-sm font-black text-gray-400 uppercase mb-4 tracking-widest">Packing Checklist</h4>
                    <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <div 
                          key={i} 
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                            item.isPacked ? 'bg-green-50/30 border-green-100' : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
                          }`} 
                          onClick={() => togglePacked(i)}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${item.isPacked ? 'bg-green-500 border-green-500 shadow-sm shadow-green-200' : 'bg-white border-gray-300'}`}>
                            {item.isPacked && <CheckCircleIcon className="w-4 h-4 text-white" />}
                          </div>
                          <span className={`text-sm font-semibold ${item.isPacked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {item.name} <span className="ml-1 text-blue-500 opacity-70">x{item.quantity}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                    <h4 className="text-sm font-black text-blue-800 uppercase mb-4 tracking-widest">Shipping Info</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">SK</div>
                        <span className="text-sm font-bold text-gray-800">{order.customer.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <PhoneIcon className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-bold text-gray-800">{order.customer.phoneNumber}</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-blue-100 flex gap-3">
                        <MapPinIcon className="w-5 h-5 text-red-500 shrink-0" />
                        <div className="text-sm text-gray-700 leading-snug">
                          <p className="font-bold">{order.customer.address.houseNumber}, {order.customer.address.street}</p>
                          <p className="text-yellow-700 font-black text-[10px] mt-1 uppercase tracking-wider">Landmark: {order.customer.address.landMark}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ADVANCE BUTTON */}
                {currentIdx < 3 && (
                  <button 
                    onClick={advanceStatus} 
                    disabled={order.status === "Packing" && !allPacked}
                    className={`mt-10 w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 group transform active:scale-95 ${
                      (order.status === "Packing" && !allPacked) 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-blue-700 hover:bg-blue-800 text-white shadow-blue-200'
                    }`}
                  >
                    {(order.status === "Packing" && !allPacked) 
                      ? "PLEASE COMPLETE PACKING" 
                      : `ADVANCE TO ${statuses[currentIdx+1].toUpperCase()}`
                    }
                    <TruckIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;