// actions/cart.js
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionTypes";

// add to cart
export const addTocart = (data) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: data._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
