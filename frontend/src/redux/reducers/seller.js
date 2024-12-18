import { createReducer } from "@reduxjs/toolkit";
import {
  LOAD_SELLER_REQUEST,
  LOAD_SELLER_SUCCESS,
  LOAD_SELLER_FAIL,
  GET_ALL_SELLERS_REQUEST,
  GET_ALL_SELLERS_SUCCESS,
  GET_ALL_SELLERS_FAIL,
  CLEAR_ERRORS,
} from '../actionTypes';

const initialState = {
  isLoading: true,
  error: null,
  sellers: [],
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_SELLER_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(LOAD_SELLER_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.isSeller = true;
      state.seller = action.payload;
    })
    .addCase(LOAD_SELLER_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    .addCase(GET_ALL_SELLERS_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_ALL_SELLERS_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase(GET_ALL_SELLERS_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});
