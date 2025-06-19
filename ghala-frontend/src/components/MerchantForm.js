import React, { useState } from 'react';
import axios from 'axios';

export default function MerchantForm() {
  const [form, setForm] = useState({
    merchantId: '',
    method: '',
    label: '',
    provider: '',
    phone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      merchantId: form.merchantId,
      method: form.method,
      config: {
        label: form.label,
        provider: form.provider,
        phone: form.phone
      }
    };
    try {
      await axios.post('http://localhost:3000/api/merchants', payload);
      alert('✅ Merchant info saved');
    } catch {
      alert('❌ Failed to save merchant info');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: 30,
        padding: 20,
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: 8,
        maxWidth: 500
      }}
    >
      <h3 style={{ color: '#444' }}>➕ Add Merchant</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {['merchantId', 'method', 'label', 'provider', 'phone'].map((field) => (
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
              outlineColor: '#007bff'
            }}
          />
        ))}
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: 4,
            cursor: 'pointer'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          💾 Save Payment Method
        </button>
      </div>
    </form>
  );
}
