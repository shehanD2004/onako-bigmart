import React, { useState, useEffect } from 'react';

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ supplier: '', deliveryDate: '', receivedQuantities: '', qualityNotes: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDeliveries();
    fetchSuppliers();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/suppliers/deliveries');
      const data = await response.json();
      setDeliveries(data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
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
      const url = editingId ? `http://localhost:5000/api/suppliers/deliveries/${editingId}` : 'http://localhost:5000/api/suppliers/deliveries';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        fetchDeliveries();
        setForm({ supplier: '', deliveryDate: '', receivedQuantities: '', qualityNotes: '' });
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error saving delivery:', error);
    }
  };

  const handleEdit = (delivery) => {
    setForm({ supplier: delivery.supplier, deliveryDate: delivery.deliveryDate, receivedQuantities: delivery.receivedQuantities, qualityNotes: delivery.qualityNotes });
    setEditingId(delivery._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/suppliers/deliveries/${id}`, { method: 'DELETE' });
      if (response.ok) fetchDeliveries();
    } catch (error) {
      console.error('Error deleting delivery:', error);
    }
  };

  return (
    <div>
      <h3>Deliveries / Receipts CRUD</h3>
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
          type="date"
          value={form.deliveryDate}
          onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Received Quantities"
          value={form.receivedQuantities}
          onChange={(e) => setForm({ ...form, receivedQuantities: e.target.value })}
          required
        />
        <textarea
          placeholder="Quality Notes"
          value={form.qualityNotes}
          onChange={(e) => setForm({ ...form, qualityNotes: e.target.value })}
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Delivery Date</th>
            <th>Received Qty</th>
            <th>Quality Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td>{delivery.supplier?.name}</td>
              <td>{new Date(delivery.deliveryDate).toLocaleDateString()}</td>
              <td>{delivery.receivedQuantities}</td>
              <td>{delivery.qualityNotes}</td>
              <td>
                <button onClick={() => handleEdit(delivery)}>Edit</button>
                <button onClick={() => handleDelete(delivery._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Deliveries;