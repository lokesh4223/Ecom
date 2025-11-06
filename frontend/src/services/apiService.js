// API Service for E-commerce Application (Mock Data Version)
// This version uses mock data instead of connecting to a backend

class ApiService {
  // Generate mock products
  generateMockProducts() {
    const sampleProductTemplates = [
      {
        id: '1',
        name: 'Classic Aviator Sunglasses',
        brand: 'Ray-Ban',
        price: 14999,
        maxQuantity: 50,
        description: 'Classic aviator sunglasses with metal frame and green lenses. Perfect for sunny days and stylish look.',
        keywords: ['sunglasses', 'aviator', 'ray-ban', 'metal', 'green'],
        sizes: ['S', 'M', 'L'],
        isFeatured: true,
        isRecommended: true,
        availableColors: ['Gold', 'Silver', 'Black'],
        image: '/static/salt-image-1.png',
        imageCollection: [{ id: '1', url: '/static/salt-image-1.png' }],
        dateAdded: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Round Frame Glasses',
        brand: 'Quay',
        price: 8999,
        maxQuantity: 30,
        description: 'Trendy round frame glasses with unique design. Perfect for adding a vintage touch to your look.',
        keywords: ['glasses', 'round', 'quay', 'vintage', 'trendy'],
        sizes: ['S', 'M'],
        isFeatured: true,
        isRecommended: false,
        availableColors: ['Black', 'Tortoise', 'Gold'],
        image: '/static/salt-image-2.png',
        imageCollection: [{ id: '2', url: '/static/salt-image-2.png' }],
        dateAdded: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Sport Performance Glasses',
        brand: 'Oakley',
        price: 19999,
        maxQuantity: 25,
        description: 'High-performance sport glasses with anti-fog lenses and comfortable fit for all-day wear.',
        keywords: ['glasses', 'sport', 'oakley', 'performance', 'anti-fog'],
        sizes: ['S', 'M', 'L'],
        isFeatured: false,
        isRecommended: true,
        availableColors: ['Black', 'Red', 'Blue'],
        image: '/static/salt-image-3.png',
        imageCollection: [{ id: '3', url: '/static/salt-image-3.png' }],
        dateAdded: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Designer Reading Glasses',
        brand: 'Gucci',
        price: 29999,
        maxQuantity: 20,
        description: 'Luxury designer reading glasses with premium materials and elegant design.',
        keywords: ['glasses', 'reading', 'gucci', 'luxury', 'designer'],
        sizes: ['S', 'M'],
        isFeatured: true,
        isRecommended: true,
        availableColors: ['Gold', 'Black', 'Tortoise'],
        image: '/static/salt-image-4.png',
        imageCollection: [{ id: '4', url: '/static/salt-image-4.png' }],
        dateAdded: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Kids Sunglasses',
        brand: 'Babiators',
        price: 4999,
        maxQuantity: 40,
        description: 'Fun and durable sunglasses designed specifically for kids with UV protection.',
        keywords: ['sunglasses', 'kids', 'babiators', 'uv', 'protection'],
        sizes: ['S'],
        isFeatured: false,
        isRecommended: false,
        availableColors: ['Blue', 'Pink', 'Red', 'Green'],
        image: '/static/salt-image-5.png',
        imageCollection: [{ id: '5', url: '/static/salt-image-5.png' }],
        dateAdded: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Blue Light Blocking Glasses',
        brand: 'Felix Gray',
        price: 12999,
        maxQuantity: 35,
        description: 'Protect your eyes from blue light with these stylish glasses perfect for computer use.',
        keywords: ['glasses', 'blue light', 'felix gray', 'computer', 'protection'],
        sizes: ['S', 'M', 'L'],
        isFeatured: true,
        isRecommended: true,
        availableColors: ['Black', 'Silver', 'Blue'],
        image: '/static/salt-image-7.png',
        imageCollection: [{ id: '6', url: '/static/salt-image-7.png' }],
        dateAdded: new Date().toISOString()
      },
      {
        id: '7',
        name: 'Cat Eye Sunglasses',
        brand: 'Quay',
        price: 7999,
        maxQuantity: 30,
        description: 'Stylish cat eye sunglasses with UV protection and comfortable fit.',
        keywords: ['sunglasses', 'cat eye', 'quay', 'stylish', 'uv'],
        sizes: ['S', 'M'],
        isFeatured: true,
        isRecommended: false,
        availableColors: ['Black', 'Tortoise', 'Pink'],
        image: '/static/salt-image-10.png',
        imageCollection: [{ id: '7', url: '/static/salt-image-10.png' }],
        dateAdded: new Date().toISOString()
      },
      {
        id: '8',
        name: 'Polarized Driving Glasses',
        brand: 'Maui Jim',
        price: 24999,
        maxQuantity: 25,
        description: 'Premium polarized glasses designed for driving with superior clarity and glare reduction.',
        keywords: ['glasses', 'polarized', 'maui jim', 'driving', 'premium'],
        sizes: ['S', 'M', 'L'],
        isFeatured: false,
        isRecommended: true,
        availableColors: ['Brown', 'Black', 'Green'],
        image: '/static/salt-image-1.png',
        imageCollection: [{ id: '8', url: '/static/salt-image-1.png' }],
        dateAdded: new Date().toISOString()
      }
    ];

    // Generate 40 products from the templates
    const products = [];
    for (let i = 0; i < 40; i++) {
      const template = sampleProductTemplates[i % sampleProductTemplates.length];
      products.push({
        ...template,
        id: `${i + 1}`,
        name: `${template.name} #${i + 1}`,
        dateAdded: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        name_lower: `${template.name.toLowerCase()} #${i + 1}`
      });
    }
    
    return products;
  }

  // PRODUCT ACTIONS --------------
  async getSingleProduct(id) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const products = this.generateMockProducts();
      const product = products.find(p => p.id === id);
      
      if (product) {
        return product;
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error(`Error getting product: ${error.message}`);
    }
  }

  async getProducts(limit = 12) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const products = this.generateMockProducts();
      return {
        products: products.slice(0, limit),
        total: products.length
      };
    } catch (error) {
      throw new Error(`Error getting products: ${error.message}`);
    }
  }

  async getFeaturedProducts(limit = 12) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const products = this.generateMockProducts();
      const featured = products.filter(p => p.isFeatured);
      return featured.slice(0, limit);
    } catch (error) {
      throw new Error(`Error getting featured products: ${error.message}`);
    }
  }

  async getRecommendedProducts(limit = 12) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const products = this.generateMockProducts();
      const recommended = products.filter(p => p.isRecommended);
      return recommended.slice(0, limit);
    } catch (error) {
      throw new Error(`Error getting recommended products: ${error.message}`);
    }
  }

  async searchProducts(searchKey) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const products = this.generateMockProducts();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchKey.toLowerCase()) ||
        p.keywords.some(k => k.toLowerCase().includes(searchKey.toLowerCase()))
      );
      
      return { products: filtered };
    } catch (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }
  }

  // AUTH ACTIONS ------------
  async createAccount(email, password, fullname) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock user creation
      const user = {
        id: 'user_' + Date.now(),
        email,
        fullname,
        role: 'USER',
        basket: [],
        dateJoined: new Date().toISOString()
      };
      
      // In a real app, you would store this in localStorage or similar
      localStorage.setItem('mockUser', JSON.stringify(user));
      
      return user;
    } catch (error) {
      throw new Error(`Error creating account: ${error.message}`);
    }
  }

  async signIn(email, password) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if we have a mock user stored
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email) {
          return user;
        }
      }
      
      // If no stored user or email doesn't match, create a mock user
      const user = {
        id: 'user_' + Date.now(),
        email,
        fullname: email.split('@')[0],
        role: 'USER',
        basket: [],
        dateJoined: new Date().toISOString()
      };
      
      localStorage.setItem('mockUser', JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error(`Error signing in: ${error.message}`);
    }
  }

  async getUser(id) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      
      throw new Error('User not found');
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }

  async updateProfile(id, updates) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const updatedUser = { ...user, ...updates };
        localStorage.setItem('mockUser', JSON.stringify(updatedUser));
        return updatedUser;
      }
      
      throw new Error('User not found');
    } catch (error) {
      throw new Error(`Error updating profile: ${error.message}`);
    }
  }

  // BASKET ACTIONS --------------
  async saveBasketItems(basket, userId) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // In a real app, you would save this to localStorage or similar
      localStorage.setItem('mockBasket', JSON.stringify(basket));
      
      return { message: 'Basket updated successfully' };
    } catch (error) {
      throw new Error(`Error saving basket items: ${error.message}`);
    }
  }
}

// Create a single instance of ApiService
const apiService = new ApiService();

export default apiService;