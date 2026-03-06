import React, { useState, useEffect } from 'react';

function SupplierProducts() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ supplier: '', product: '', price: '', leadTime: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSupplierProducts();
    fetchSuppliers();
  }, []);

  const fetchSupplierProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/suppliers/supplier-products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching supplier products:', error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/suppliers');
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `http://localhost:5000/api/suppliers/supplier-products/${editingId}` : 'http://localhost:5000/api/suppliers/supplier-products';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        fetchSupplierProducts();
        setForm({ supplier: '', product: '', price: '', leadTime: '' });
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error saving supplier product:', error);
    }
  };

  const handleEdit = (product) => {
    setForm({ supplier: product.supplier, product: product.product, price: product.price, leadTime: product.leadTime });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/suppliers/supplier-products/${id}`, { method: 'DELETE' });
      if (response.ok) fetchSupplierProducts();
    } catch (error) {
      console.error('Error deleting supplier product:', error);
    }
  };

  return (
    <div>
      <h3>Supplier Products / Pricing CRUD</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={form.supplier}
          onChange={(e) => setForm({ ...form, supplier: e.target.value })}
          required
        >
          <option value="">Select Supplier</option>
          {suppliers.map((sup) => (
            <option key={sup._id} value={sup._id}>{sup.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Product Name"
          value={form.product}
          onChange={(e) => setForm({ ...form, product: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Lead Time (days)"
          value={form.leadTime}
          onChange={(e) => setForm({ ...form, leadTime: e.target.value })}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Product</th>
            <th>Price</th>
            <th>Lead Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.supplier?.name}</td>
              <td>{product.product}</td>
              <td>${product.price}</td>
              <td>{product.leadTime} days</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupplierProducts;