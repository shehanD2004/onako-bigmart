const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for fetch requests
const fetchRequest = async (url, options = {}) => {
  try {
    const { headers: customHeaders, ...restOptions } = options;
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders,
      },
      ...restOptions,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'API request failed' }));
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============== SUPPLIERS ==============
export const fetchSuppliers = () =>
  fetchRequest('/suppliers');

export const fetchSupplier = (id) =>
  fetchRequest(`/suppliers/${id}`);

export const createSupplier = (data) =>
  fetchRequest('/suppliers', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateSupplier = (id, data) =>
  fetchRequest(`/suppliers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteSupplier = (id) =>
  fetchRequest(`/suppliers/${id}`, {
    method: 'DELETE',
  });

// ============== PURCHASE ORDERS ==============
export const fetchPurchaseOrders = () =>
  fetchRequest('/suppliers/purchase-orders');

export const fetchPurchaseOrder = (id) =>
  fetchRequest(`/suppliers/purchase-orders/${id}`);

export const createPurchaseOrder = (data) =>
  fetchRequest('/suppliers/purchase-orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updatePurchaseOrder = (id, data) =>
  fetchRequest(`/suppliers/purchase-orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deletePurchaseOrder = (id) =>
  fetchRequest(`/suppliers/purchase-orders/${id}`, {
    method: 'DELETE',
  });

// ============== SUPPLIER PRODUCTS ==============
export const fetchSupplierProducts = () =>
  fetchRequest('/suppliers/supplier-products');

export const fetchSupplierProduct = (id) =>
  fetchRequest(`/suppliers/supplier-products/${id}`);

export const createSupplierProduct = (data) =>
  fetchRequest('/suppliers/supplier-products', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateSupplierProduct = (id, data) =>
  fetchRequest(`/suppliers/supplier-products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteSupplierProduct = (id) =>
  fetchRequest(`/suppliers/supplier-products/${id}`, {
    method: 'DELETE',
  });

// ============== DELIVERIES ==============
export const fetchDeliveries = () =>
  fetchRequest('/suppliers/deliveries');

export const fetchDelivery = (id) =>
  fetchRequest(`/suppliers/deliveries/${id}`);

export const createDelivery = (data) =>
  fetchRequest('/suppliers/deliveries', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateDelivery = (id, data) =>
  fetchRequest(`/suppliers/deliveries/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteDelivery = (id) =>
  fetchRequest(`/suppliers/deliveries/${id}`, {
    method: 'DELETE',
  });

// ============== PAYMENTS ==============
export const fetchPayments = () =>
  fetchRequest('/suppliers/payments');

export const fetchPayment = (id) =>
  fetchRequest(`/suppliers/payments/${id}`);

export const createPayment = (data) =>
  fetchRequest('/suppliers/payments', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updatePayment = (id, data) =>
  fetchRequest(`/suppliers/payments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deletePayment = (id) =>
  fetchRequest(`/suppliers/payments/${id}`, {
    method: 'DELETE',
  });