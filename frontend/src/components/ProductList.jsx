import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const result = await apiService.addToCart(productId, 1);
      console.log('Added to cart:', result);
      // Refresh cart
      const cartData = await apiService.getCart();
      setCart(cartData.cartItems);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.productId}>
                <p>{item.product.name} - Quantity: {item.qty} - Subtotal: ${item.subtotal}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;