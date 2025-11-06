/* eslint-disable react/jsx-props-no-spreading */
import { AppliedFilters, ProductGrid, ProductList } from '@/components/product';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { selectFilter } from '@/selectors/selector';
import { getProducts } from '@/redux/actions/productActions';

const Shop = () => {
  useDocumentTitle('Shop | Ecom');
  useScrollTop();

  const dispatch = useDispatch();
  
  const store = useSelector((state) => ({
    filteredProducts: selectFilter(state.products.items, state.filter),
    products: state.products,
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading
  }), shallowEqual);

  // Fetch products when component mounts
  useEffect(() => {
    if (store.products.items.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, store.products.items.length]);

  return (
    <main className="content">
      <section className="product-list-wrapper">
        <AppliedFilters filteredProductsCount={store.filteredProducts.length} />
        <ProductList {...store}>
          <ProductGrid products={store.filteredProducts} />
        </ProductList>
      </section>
    </main>
  );
};

export default Shop;