// reducers/cart.js
import { createReducer } from "@reduxjs/toolkit";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionTypes";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_TO_CART, (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);
      if (isItemExist) {
        state.cart = state.cart.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cart.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    })
    .addCase(REMOVE_FROM_CART, (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((i) => i._id !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    });
});
