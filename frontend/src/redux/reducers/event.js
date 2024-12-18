import { createReducer } from "@reduxjs/toolkit";
import {
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  GET_ALL_EVENTS_SHOP_REQUEST,
  GET_ALL_EVENTS_SHOP_SUCCESS,
  GET_ALL_EVENTS_SHOP_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAIL,
  CLEAR_ERRORS
} from '../actionTypes';

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(EVENT_CREATE_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(EVENT_CREATE_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase(EVENT_CREATE_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase(GET_ALL_EVENTS_SHOP_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_ALL_EVENTS_SHOP_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase(GET_ALL_EVENTS_SHOP_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_EVENT_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(DELETE_EVENT_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase(DELETE_EVENT_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(GET_ALL_EVENTS_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_ALL_EVENTS_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
    })
    .addCase(GET_ALL_EVENTS_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});
