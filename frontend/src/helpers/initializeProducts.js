import apiService from '@/services/apiService';

const initializeProducts = async () => {
  try {
    console.log('Initializing mock products...');
    
    // In a mock environment, we don't need to initialize anything
    // The apiService already generates mock products on demand
    console.log('Mock products are ready to use');
    
    return true;
  } catch (error) {
    console.error('Error initializing mock products:', error);
    return true;
  }
};

export default initializeProducts;