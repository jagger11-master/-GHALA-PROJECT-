// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());

const saveToFile = (filename, data) => {
  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

const readFromFile = (filename) => {
  const filepath = path.join(__dirname, filename);
  if (!fs.existsSync(filepath)) return [];
  const raw = fs.readFileSync(filepath);
  return JSON.parse(raw);
};


// ======= In-Memory Storage =======
let merchants = readFromFile('merchants.json');
let orders = readFromFile('orders.json');

// ======= 1. Merchant Payment Configuration =======
app.post('/api/merchants', (req, res) => {
  const { merchantId, method, config } = req.body;
  const existing = merchants.find(m => m.merchantId === merchantId);

  if (existing) {
    existing.method = method;
    existing.config = config;
  } else {
    merchants.push({ merchantId, method, config });
  }

  saveToFile('merchants.json', merchants);
  res.status(200).json({ message: 'Payment method saved successfully' });
});

// ✅ GET ALL MERCHANTS
app.get('/api/merchants', (req, res) => {
  res.status(200).json(merchants);
});

app.get('/api/merchants/:id', (req, res) => {
  const merchant = merchants.find(m => m.merchantId === req.params.id);
  if (!merchant) return res.status(404).json({ message: 'Merchant not found' });
  res.status(200).json(merchant);
});

// ======= 2. Customer Places an Order =======
app.post('/api/orders', (req, res) => {
  const { orderId, merchantId, product, total } = req.body;
  const status = 'pending';

  const order = { orderId, merchantId, product, total, status };
  orders.push(order);

  saveToFile('orders.json', orders);
  res.status(201).json({ message: 'Order placed successfully', order });
});

app.get('/api/orders', (req, res) => {
  res.status(200).json(orders);
});

// ======= 3. Simulate Payment Confirmation =======
app.post('/api/simulate-payment/:orderId', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = 'processing';
  res.status(200).json({ message: 'Payment simulation started' });

  setTimeout(() => {
    order.status = 'paid';
    console.log(`✅ Order ${order.orderId} marked as paid.`);
  }, 5000);
});

// ======= Test Endpoint =======
app.get('/', (req, res) => {
  res.send('🎉 Ghala Backend is Running!');
});

// ======= Start Server =======
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
