import { createReducer } from "@reduxjs/toolkit";
import * as actionTypes from '../actionTypes';

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionTypes.GET_ALL_ORDERS_USER_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(actionTypes.GET_ALL_ORDERS_USER_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase(actionTypes.GET_ALL_ORDERS_USER_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(actionTypes.GET_ALL_ORDERS_SHOP_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(actionTypes.GET_ALL_ORDERS_SHOP_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase(actionTypes.GET_ALL_ORDERS_SHOP_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(actionTypes.ADMIN_ALL_ORDERS_REQUEST, (state) => {
      state.adminOrderLoading = true;
    })
    .addCase(actionTypes.ADMIN_ALL_ORDERS_SUCCESS, (state, action) => {
      state.adminOrderLoading = false;
      state.adminOrders = action.payload;
    })
    .addCase(actionTypes.ADMIN_ALL_ORDERS_FAILED, (state, action) => {
      state.adminOrderLoading = false;
      state.error = action.payload;
    })
    .addCase(actionTypes.CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});
