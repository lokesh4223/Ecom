import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import apiService from '@/services/apiService';

const useFeaturedProducts = (itemsCount) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const products = await apiService.getFeaturedProducts(itemsCount);

      if (products.length === 0) {
        if (didMount) {
          setError('No featured products found.');
          setLoading(false);
        }
      } else {
        if (didMount) {
          setFeaturedProducts(products);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        // Handle permission errors specifically
        if (e.message && e.message.includes('permission')) {
          setError('Unable to load products due to permissions. Please contact administrator.');
        } else {
          setError('Failed to fetch featured products: ' + e.message);
        }
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (featuredProducts.length === 0 && didMount) {
      fetchFeaturedProducts();
    }
  }, []);

  return {
    featuredProducts, fetchFeaturedProducts, isLoading, error
  };
};

export default useFeaturedProducts;