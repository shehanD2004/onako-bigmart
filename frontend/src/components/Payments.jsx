import React, { useState, useEffect } from 'react';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ supplier: '', invoiceNumber: '', amount: '', status: 'Pending' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPayments();
    fetchSuppliers();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/suppliers/payments');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
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
      const url = editingId ? `http://localhost:5000/api/suppliers/payments/${editingId}` : 'http://localhost:5000/api/suppliers/payments';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        fetchPayments();
        setForm({ supplier: '', invoiceNumber: '', amount: '', status: 'Pending' });
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  const handleEdit = (payment) => {
    setForm({ supplier: payment.supplier, invoiceNumber: payment.invoiceNumber, amount: payment.amount, status: payment.status });
    setEditingId(payment._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/suppliers/payments/${id}`, { method: 'DELETE' });
      if (response.ok) fetchPayments();
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  return (
    <div>
      <h3>Supplier Payments / Invoices CRUD</h3>
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
          placeholder="Invoice Number"
          value={form.invoiceNumber}
          onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Voided">Voided</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Invoice Number</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.supplier?.name}</td>
              <td>{payment.invoiceNumber}</td>
              <td>${payment.amount}</td>
              <td>{payment.status}</td>
              <td>
                <button onClick={() => handleEdit(payment)}>Edit</button>
                <button onClick={() => handleDelete(payment._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;