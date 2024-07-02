// Define action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const LOAD_CART = 'LOAD_CART';

// Action creators
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const loadCart = (cart) => ({
  type: LOAD_CART,
  payload: cart,
});
