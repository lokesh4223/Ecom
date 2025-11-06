// Simple API service to communicate with our backend
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  // GET /api/products: 5-10 mock items (id, name, price)
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // POST /api/cart: Add {productId, qty}
  async addToCart(productId, qty) {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, qty }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  // DELETE /api/cart/:id: Remove item
  async removeFromCart(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  // GET /api/cart: Get cart + total
  async getCart() {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  }

  // POST /api/checkout: {cartItems} → mock receipt (total, timestamp)
  async checkout(name, email) {
    try {
      const response = await fetch(`${API_BASE_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }
  }
}

const apiService = new ApiService();
export default apiService;