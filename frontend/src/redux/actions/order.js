import axios from "axios";
import * as actionTypes from '../actionTypes';

// get all orders of user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ALL_ORDERS_USER_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:3500/api/v2/order/get-all-orders/${userId}`
    );

    dispatch({
      type: actionTypes.GET_ALL_ORDERS_USER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_ORDERS_USER_FAILED,
      payload: error.response.data.message,
    });
  }
};

// get all orders of seller
export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ALL_ORDERS_SHOP_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:3500/api/v2/order/get-seller-all-orders/${shopId}`
    );

    dispatch({
      type: actionTypes.GET_ALL_ORDERS_SHOP_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_ORDERS_SHOP_FAILED,
      payload: error.response.data.message,
    });
  }
};

// get all orders of Admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.ADMIN_ALL_ORDERS_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:3500/api/v2/order/admin-all-orders`, {
      withCredentials: true,
    });

    dispatch({
      type: actionTypes.ADMIN_ALL_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_ALL_ORDERS_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS,
});
