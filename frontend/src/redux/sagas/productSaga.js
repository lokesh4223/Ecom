/* eslint-disable indent */
import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS,
  REMOVE_PRODUCT,
  SEARCH_PRODUCT
} from '@/constants/constants';
import { ADMIN_PRODUCTS } from '@/constants/routes';
import { displayActionMessage } from '@/helpers/utils';
import {
  all, call, put, select
} from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '@/redux/actions/miscActions';
import { history } from '@/routers/AppRouter';
import apiService from '@/services/apiService';
import {
  addProductSuccess,
  clearSearchState, editProductSuccess, getProductsSuccess,
  removeProductSuccess,
  searchProductSuccess
} from '../actions/productActions';

function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}

function* handleError(e) {
  yield put(setLoading(false));
  
  // Handle different error types
  if (e.message) {
    if (e.message.includes('permission')) {
      yield put(setRequestStatus('Permission denied. Please contact administrator.'));
    } else {
      yield put(setRequestStatus(e?.message || 'Failed to fetch products'));
    }
  } else {
    yield put(setRequestStatus(e?.message || 'Failed to fetch products'));
  }
  console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* productSaga({ type, payload }) {
  switch (type) {
    case GET_PRODUCTS:
      try {
        yield initRequest();
        const state = yield select();
        const result = yield call(apiService.getProducts, payload);

        // For mock data, we should always have products
        yield put(getProductsSuccess({
          products: result.products,
          lastKey: result.lastKey ? result.lastKey : state.products.lastRefKey,
          total: result.total ? result.total : state.products.total
        }));
        yield put(setRequestStatus(''));
        
        yield put(setLoading(false));
      } catch (e) {
        console.log(e);
        yield handleError(e);
      }
      break;

    case SEARCH_PRODUCT: {
      try {
        yield initRequest();
        // clear search data
        yield put(clearSearchState());

        const state = yield select();
        const result = yield call(apiService.searchProducts, payload.searchKey);

        // Even if no products found, it's not an error - just show empty results
        yield put(searchProductSuccess({
          products: result.products,
          lastKey: result.lastKey ? result.lastKey : state.products.searchedProducts.lastRefKey,
          total: result.total ? result.total : state.products.searchedProducts.total
        }));
        yield put(setRequestStatus(''));
        
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
      }
      break;
    }
    default: {
      // Remove error for unexpected action types
      console.log('Unexpected Action Type:', type);
    }
  }
}

export default productSaga;