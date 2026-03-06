import React, { useState, useEffect } from 'react';
import { fetchSupplierProduct, fetchSuppliers } from '../../services/api';
import toast from 'react-hot-toast';

// Dummy products
const DUMMY_PRODUCTS = [
  { id: 'prod1', name: 'Product A' },
  { id: 'prod2', name: 'Product B' },
  { id: 'prod3', name: 'Product C' },
];

const SupplierProductDetails = ({ productId, onEdit, onBack }) => {
  const [product, setProduct] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [productId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productData, suppliersData] = await Promise.all([
        fetchSupplierProduct(productId),
        fetchSuppliers(),
      ]);
      setProduct(productData);
      setSuppliers(suppliersData);
    } catch (error) {
      toast.error('Failed to load product details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-12 text-gray-500">Product not found</div>;
  }

  const supplier = suppliers.find((s) => s._id === product.supplier);
  const productInfo = DUMMY_PRODUCTS.find((p) => p.id === product.product);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product._id)}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            Edit
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Back
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Supplier</label>
          <p className="text-gray-900 font-semibold">{supplier?.name || 'Unknown'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Product</label>
          <p className="text-gray-900 font-semibold">
            {productInfo?.name || product.product}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
          <p className="text-gray-900 font-semibold">
            {product.price} {product.currency || 'LKR'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Minimum Order Quantity
          </label>
          <p className="text-gray-900 font-semibold">{product.minimumOrderQuantity || '-'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Lead Time</label>
          <p className="text-gray-900 font-semibold">
            {product.leadTime ? `${product.leadTime} days` : '-'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupplierProductDetails;