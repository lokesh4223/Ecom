import { ArrowRightOutlined } from '@ant-design/icons';
import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from '@/constants/routes';
import {
  useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop
} from '@/hooks';
import bannerImg from '@/images/banner-girl.png';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Import the function to initialize products
import initializeProducts from '@/helpers/initializeProducts';

const Home = () => {
  useDocumentTitle('Ecom | Home');
  useScrollTop();

  const [isInitializing, setIsInitializing] = useState(false);
  const [initMessage, setInitMessage] = useState('');

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended
  } = useRecommendedProducts(6);

  // Check if we need to initialize products
  useEffect(() => {
    const checkAndInitializeProducts = async () => {
      // Only initialize if there are no featured products
      if (featuredProducts.length === 0 && !isLoadingFeatured && !errorFeatured) {
        setIsInitializing(true);
        setInitMessage('Checking for products...');
        
        try {
          const success = await initializeProducts();
          if (success) {
            setInitMessage('Sample products added! Refreshing...');
            // Refresh the products after adding samples
            fetchFeaturedProducts();
            fetchRecommendedProducts();
            
            // Wait a bit for the data to refresh
            setTimeout(() => {
              setIsInitializing(false);
              setInitMessage('');
            }, 2000);
          } else {
            // If initialization failed, still try to fetch products
            // (they might already exist)
            fetchFeaturedProducts();
            fetchRecommendedProducts();
            
            setTimeout(() => {
              setIsInitializing(false);
              setInitMessage('');
            }, 1000);
          }
        } catch (error) {
          console.log('Initialization not possible, fetching existing products...');
          // Even if initialization fails, try to fetch existing products
          fetchFeaturedProducts();
          fetchRecommendedProducts();
          
          setIsInitializing(false);
          setInitMessage('');
        }
      }
    };

    checkAndInitializeProducts();
  }, [featuredProducts.length, isLoadingFeatured, errorFeatured]);

  return (
    <main className="content">
      <div className="home">
        {/* Show initialization message if needed */}
        {isInitializing && (
          <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f8ff' }}>
            <p>{initMessage}</p>
          </div>
        )}
        
        <div className="banner">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>See</strong>
              &nbsp;everything with&nbsp;
              <strong>Clarity</strong>
            </h1>
            <p>
              Buying eyewear should leave you happy and good-looking, with money in your pocket.
              Glasses, sunglasses, and contacts—we've got your eyes covered.
            </p>
            <br />
            <Link to={SHOP} className="button">
              Shop Now &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img"><img src={bannerImg} alt="" /></div>
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Featured Products</h1>
            <Link to={FEATURED_PRODUCTS}>See All</Link>
          </div>
          {(errorFeatured && !isLoadingFeatured) ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts}
              skeletonCount={6}
            />
          )}
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Recommended Products</h1>
            <Link to={RECOMMENDED_PRODUCTS}>See All</Link>
          </div>
          {(errorRecommended && !isLoadingRecommended) ? (
            <MessageDisplay
              message={errorRecommended}
              action={fetchRecommendedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={recommendedProducts}
              skeletonCount={6}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;