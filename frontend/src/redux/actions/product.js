import axios from "axios";
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

// create product
// create product
// create product
export const createProduct =
  (formData) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `http://localhost:3500/api/v2/product/create-product`,
        formData,
        config
      );

      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };



// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_PRODUCTS_SHOP_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:3500/api/v2/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: GET_ALL_PRODUCTS_SHOP_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_SHOP_FAILED,
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(
      `http://localhost:3500/api/v2/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILED,
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:3500/api/v2/product/get-all-products`);
    dispatch({
      type: GET_ALL_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAILED,
      payload: error.response.data.message,
    });
  }
};
