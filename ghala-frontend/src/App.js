import React, { useState } from 'react';
import MerchantForm from './components/MerchantForm';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';

function App() {
  const [reload, setReload] = useState(false);

  const refreshOrders = () => {
    setReload(!reload); // trigger rerender
  };

  return (
    <div>
      <h1>📦 Ghala Admin Panel</h1>
      <MerchantForm />
      <OrderForm onOrderAdded={refreshOrders} />
      <OrderList key={reload} />
    </div>
  );
}

export default App;
