import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  // Fungua orders zote kutoka backend
  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  // Simulate payment kwa order maalum
  const simulatePayment = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/simulate-payment/${id}`);
      setTimeout(fetchOrders, 6000); // refresh list baada ya 6 sekunde
    } catch (err) {
      console.error("Failed to simulate payment", err);
    }
  };

  // Fetch orders mara moja component ikipakiwa
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>🧾 Order List</h2>
      {orders.length === 0 ? (
        <p>Hakuna oda bado.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Merchant ID</th>
              <th>Product</th>
              <th>Total (TZS)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.merchantId}</td>
                <td>{order.product}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => simulatePayment(order.orderId)}>
                    Simulate Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
