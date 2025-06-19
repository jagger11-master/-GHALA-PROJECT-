import React, { useState } from 'react';
import axios from 'axios';

export default function OrderForm({ onOrderAdded }) {
  const [form, setForm] = useState({
    orderId: '',
    merchantId: '',
    product: '',
    total: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/orders', {
        ...form,
        total: parseInt(form.total),
      });
      alert('✅ Order placed successfully');
      setForm({ orderId: '', merchantId: '', product: '', total: '' });
      onOrderAdded();
    } catch {
      alert('❌ Failed to place order');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: 30,
        padding: 20,
        backgroundColor: '#eef6ff',
        border: '1px solid #cce0ff',
        borderRadius: 8,
        maxWidth: 500
      }}
    >
      <h3 style={{ color: '#2255aa' }}>🛒 Add New Order</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {['orderId', 'merchantId', 'product', 'total'].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required
            style={{
              padding: '10px',
              borderRadius: 4,
              border: '1px solid #ccc',
              outlineColor: '#3399ff'
            }}
          />
        ))}
        <button
          type="submit"
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: 4,
            cursor: 'pointer'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1e7e34')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
        >
          📦 Place Order
        </button>
      </div>
    </form>
  );
}
