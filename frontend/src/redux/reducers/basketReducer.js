import {
  ADD_QTY_ITEM, ADD_TO_BASKET,
  CLEAR_BASKET,
  MINUS_QTY_ITEM, REMOVE_FROM_BASKET,
  SET_BASKET_ITEMS
} from '@/constants/constants';

export default (state = [], action) => {
  switch (action.type) {
    case SET_BASKET_ITEMS:
      return action.payload;
    case ADD_TO_BASKET:
      // Ensure product has proper default values
      const productWithDefaults = {
        ...action.payload,
        quantity: action.payload.quantity && !isNaN(action.payload.quantity) ? action.payload.quantity : 1,
        price: action.payload.price && !isNaN(action.payload.price) ? action.payload.price : 0,
        maxQuantity: action.payload.maxQuantity && !isNaN(action.payload.maxQuantity) ? action.payload.maxQuantity : 10
      };
      
      return state.some((product) => product.id === productWithDefaults.id)
        ? state
        : [productWithDefaults, ...state];
    case REMOVE_FROM_BASKET:
      return state.filter((product) => product.id !== action.payload);
    case CLEAR_BASKET:
      return [];
    case ADD_QTY_ITEM:
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            quantity: (product.quantity && !isNaN(product.quantity) ? product.quantity : 1) + 1
          };
        }
        return product;
      });
    case MINUS_QTY_ITEM:
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            quantity: Math.max(1, (product.quantity && !isNaN(product.quantity) ? product.quantity : 1) - 1)
          };
        }
        return product;
      });
    default:
      return state;
  }
};