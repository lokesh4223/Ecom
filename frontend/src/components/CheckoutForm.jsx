import React, { useState } from 'react';
import apiService from '../services/api';

const CheckoutForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiService.checkout(name, email);
      setReceipt(result);
    } catch (err) {
      setError('Failed to process checkout');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (receipt) {
    return (
      <div>
        <h2>Order Receipt</h2>
        <p>Receipt ID: {receipt.id}</p>
        <p>Name: {receipt.name}</p>
        <p>Email: {receipt.email}</p>
        <p>Total: ${receipt.total}</p>
        <p>Timestamp: {receipt.timestamp}</p>
        <h3>Items:</h3>
        <ul>
          {receipt.items.map((item, index) => (
            <li key={index}>
              {item.name} - Qty: {item.qty} - ${item.subtotal}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2>Checkout</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Complete Checkout'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;