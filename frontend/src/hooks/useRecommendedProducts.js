import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import apiService from '@/services/apiService';

const useRecommendedProducts = (itemsCount) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchRecommendedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const products = await apiService.getRecommendedProducts(itemsCount);

      if (products.length === 0) {
        if (didMount) {
          setError('No recommended products found.');
          setLoading(false);
        }
      } else {
        if (didMount) {
          setRecommendedProducts(products);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        // Handle permission errors specifically
        if (e.message && e.message.includes('permission')) {
          setError('Unable to load products due to permissions. Please contact administrator.');
        } else {
          setError('Failed to fetch recommended products: ' + e.message);
        }
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (recommendedProducts.length === 0 && didMount) {
      fetchRecommendedProducts();
    }
  }, []);

  return {
    recommendedProducts, fetchRecommendedProducts, isLoading, error
  };
};

export default useRecommendedProducts;