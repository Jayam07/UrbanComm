import { createReducer } from "@reduxjs/toolkit";
import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_SELLER_REQUEST,
  LOAD_SELLER_SUCCESS,
  LOAD_SELLER_FAIL,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL,
  UPDATE_USER_ADDRESS_REQUEST,
  UPDATE_USER_ADDRESS_SUCCESS,
  UPDATE_USER_ADDRESS_FAIL,
  DELETE_USER_ADDRESS_REQUEST,
  DELETE_USER_ADDRESS_SUCCESS,
  DELETE_USER_ADDRESS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from '../actionTypes'; 

const initialState = {
  isAuthenticated: false,
  loading: false,
  addressloading: false,
  usersLoading: false,
  error: null,
  successMessage: null,
  user: null,
  users: [],
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOAD_USER_SUCCESS, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(LOAD_USER_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(LOAD_SELLER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOAD_SELLER_SUCCESS, (state, action) => {
      state.loading = false;
      // Handle success state for loading seller
    })
    .addCase(LOAD_SELLER_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(UPDATE_USER_INFO_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(UPDATE_USER_INFO_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(UPDATE_USER_INFO_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(UPDATE_USER_ADDRESS_REQUEST, (state) => {
      state.addressloading = true;
    })
    .addCase(UPDATE_USER_ADDRESS_SUCCESS, (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase(UPDATE_USER_ADDRESS_FAIL, (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_USER_ADDRESS_REQUEST, (state) => {
      state.addressloading = true;
    })
    .addCase(DELETE_USER_ADDRESS_SUCCESS, (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase(DELETE_USER_ADDRESS_FAIL, (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })
    .addCase(GET_ALL_USERS_REQUEST, (state) => {
      state.usersLoading = true;
    })
    .addCase(GET_ALL_USERS_SUCCESS, (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase(GET_ALL_USERS_FAIL, (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(CLEAR_MESSAGES, (state) => {
      state.successMessage = null;
    });
});
