import React, { useState, useEffect } from 'react';
import { fetchSuppliers, fetchSupplierProduct, createSupplierProduct, updateSupplierProduct } from '../../services/api';
import toast from 'react-hot-toast';

// Dummy products for now
const DUMMY_PRODUCTS = [
  { id: 'prod1', name: 'Product A' },
  { id: 'prod2', name: 'Product B' },
  { id: 'prod3', name: 'Product C' },
];

const SupplierProductForm = ({ productId, onSuccess, onCancel }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    supplier: '',
    product: '',
    price: '',
    currency: 'LKR',
    minimumOrderQuantity: 1,
    leadTime: '',
  });

  useEffect(() => {
    loadSuppliers();
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadSuppliers = async () => {
    try {
      const data = await fetchSuppliers();
      setSuppliers(data);
    } catch (error) {
      toast.error('Failed to load suppliers');
      console.error(error);
    }
  };

  const loadProduct = async () => {
    setLoading(true);
    try {
      const data = await fetchSupplierProduct(productId);
      setFormData({
        supplier: data.supplier,
        product: data.product,
        price: data.price,
        currency: data.currency || 'LKR',
        minimumOrderQuantity: data.minimumOrderQuantity || 1,
        leadTime: data.leadTime || '',
      });
    } catch (error) {
      toast.error('Failed to load product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.supplier || !formData.product || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        supplier: formData.supplier,
        product: formData.product,
        price: parseFloat(formData.price),
        currency: formData.currency,
        minimumOrderQuantity: parseInt(formData.minimumOrderQuantity) || 1,
        leadTime: formData.leadTime ? parseInt(formData.leadTime) : undefined,
      };

      if (productId) {
        await updateSupplierProduct(productId, payload);
        toast.success('Supplier product updated successfully');
      } else {
        await createSupplierProduct(payload);
        toast.success('Supplier product created successfully');
      }

      onSuccess();
    } catch (error) {
      toast.error(productId ? 'Failed to update product' : 'Failed to create product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {productId ? 'Edit Supplier Product' : 'Create New Supplier Product'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplier *
            </label>
            <select
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select a supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product *
            </label>
            <select
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select a product</option>
              {DUMMY_PRODUCTS.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <input
              type="text"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Order Quantity
            </label>
            <input
              type="number"
              min="1"
              value={formData.minimumOrderQuantity}
              onChange={(e) => setFormData({ ...formData, minimumOrderQuantity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lead Time (days)
            </label>
            <input
              type="number"
              min="0"
              value={formData.leadTime}
              onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierProductForm;