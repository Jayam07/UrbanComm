// reducers/cart.js
import { createReducer } from "@reduxjs/toolkit";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../actionTypes";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_TO_WISHLIST, (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);
      if (isItemExist) {
        state.wishlist = state.wishlist.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.wishlist.push(item);
      }
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    })
    .addCase(REMOVE_FROM_WISHLIST, (state, action) => {
      const itemId = action.payload;
      state.wishlist = state.wishlist.filter((i) => i._id !== itemId);
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    });
});

