import { displayActionMessage } from '@/helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket as dispatchAddToBasket, removeFromBasket } from '@/redux/actions/basketActions';

const useBasket = () => {
  const { basket } = useSelector((state) => ({ basket: state.basket }));
  const dispatch = useDispatch();

  const isItemOnBasket = (id) => !!basket.find((item) => item.id === id);

  const addToBasket = (product) => {
    // Ensure product has proper default values
    const productWithDefaults = {
      ...product,
      quantity: product.quantity && !isNaN(product.quantity) ? product.quantity : 1,
      price: product.price && !isNaN(product.price) ? product.price : 0
    };
    
    if (isItemOnBasket(productWithDefaults.id)) {
      dispatch(removeFromBasket(productWithDefaults.id));
      displayActionMessage('Item removed from basket', 'info');
    } else {
      dispatch(dispatchAddToBasket(productWithDefaults));
      displayActionMessage('Item added to basket', 'success');
    }
  };

  return { basket, isItemOnBasket, addToBasket };
};

export default useBasket;