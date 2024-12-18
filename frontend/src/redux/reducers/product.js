import { createReducer } from "@reduxjs/toolkit";
import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  GET_ALL_PRODUCTS_SHOP_REQUEST,
  GET_ALL_PRODUCTS_SHOP_SUCCESS,
  GET_ALL_PRODUCTS_SHOP_FAILED,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILED,
  CLEAR_ERRORS,
} from '../actionTypes'; 

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(PRODUCT_CREATE_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(PRODUCT_CREATE_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase(PRODUCT_CREATE_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase(GET_ALL_PRODUCTS_SHOP_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_ALL_PRODUCTS_SHOP_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase(GET_ALL_PRODUCTS_SHOP_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_PRODUCT_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(DELETE_PRODUCT_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase(DELETE_PRODUCT_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(GET_ALL_PRODUCTS_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_ALL_PRODUCTS_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase(GET_ALL_PRODUCTS_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});
