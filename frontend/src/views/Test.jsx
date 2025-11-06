import React from 'react';
import ProductList from '@/components/ProductList';
import CheckoutForm from '@/components/CheckoutForm';

const Test = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Backend Integration Test</h1>
      <ProductList />
      <hr style={{ margin: '40px 0' }} />
      <CheckoutForm />
    </div>
  );
};

export default Test;