import axios from 'axios';
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
} from '../actionTypes'; // Adjust the path based on your project structure

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    const { data } = await axios.get('http://localhost:3500/api/getuser', {
      withCredentials: true,
    });
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_SELLER_REQUEST,
    });
    const { data } = await axios.get('http://localhost:3500/api/v2/shop/getSeller', {
      withCredentials: true,
    });
    dispatch({
      type: LOAD_SELLER_SUCCESS,
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: LOAD_SELLER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update user information
export const updateUserInformation = (name, email, phoneNumber, password) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_INFO_REQUEST,
    });

    const { data } = await axios.put(
      'http://localhost:3500/api/update-user-info',
      { email, password, phoneNumber, name },
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Credentials': true,
        },
      }
    );

    dispatch({
      type: UPDATE_USER_INFO_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update user address
export const updatUserAddress = (country, city, address1, address2, zipCode, addressType) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_ADDRESS_REQUEST,
    });

    const { data } = await axios.put(
      'http://localhost:3500/api/update-user-addresses',
      { country, city, address1, address2, zipCode, addressType },
      { withCredentials: true }
    );

    dispatch({
      type: UPDATE_USER_ADDRESS_SUCCESS,
      payload: { successMessage: 'User address updated successfully!', user: data.user },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_ADDRESS_REQUEST,
    });

    const { data } = await axios.delete(`http://localhost:3500/api/delete-user-address/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: DELETE_USER_ADDRESS_SUCCESS,
      payload: { successMessage: 'User Address deleted successfully!', user: data.user },
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all users (admin)
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_USERS_REQUEST,
    });

    const { data } = await axios.get('http://localhost:3500/api/admin-all-users', {
      withCredentials: true,
    });

    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// Clear messages
export const clearMessages = () => (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};

// Define other action creators similarly...
