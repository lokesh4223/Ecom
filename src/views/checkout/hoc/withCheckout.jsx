/* eslint-disable no-nested-ternary */
import { SIGNIN } from '@/constants/routes';
import { calculateTotal } from '@/helpers/utils';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

const withCheckout = (Component) => withRouter((props) => {
  const state = useSelector((store) => ({
    isAuth: !!store.auth.id && !!store.auth.role,
    basket: store.basket,
    shipping: store.checkout.shipping,
    payment: store.checkout.payment,
    profile: store.profile
  }));

  // Calculate subtotal with proper validation
  const calculateSubtotal = () => {
    const totals = state.basket.map((product) => {
      const price = product.price && !isNaN(product.price) ? product.price : 0;
      const quantity = product.quantity && !isNaN(product.quantity) ? product.quantity : 0;
      return price * quantity;
    });
    return calculateTotal(totals);
  };

  const shippingFee = state.shipping.isInternational ? 3700 : 0;
  const subtotal = calculateSubtotal();

  if (!state.isAuth) {
    return <Redirect to={SIGNIN} />;
  } if (state.basket.length === 0) {
    return <Redirect to="/" />;
  } if (state.isAuth && state.basket.length !== 0) {
    return (
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        basket={state.basket}
        payment={state.payment}
        profile={state.profile}
        shipping={state.shipping}
        subtotal={Number(subtotal) + shippingFee}
      />
    );
  }
  return null;
});

export default withCheckout;