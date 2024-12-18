import axios from "axios";
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
} from '../actionTypes';
// create event
export const createevent = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(`http://localhost:3500/api/v2/event/create-event`, formData, config);
    dispatch({
      type: EVENT_CREATE_SUCCESS,
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: EVENT_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_EVENTS_SHOP_REQUEST,
    });
                    
    const { data } = await axios.get(`http://localhost:3500/api/v2/event/get-all-events/${id}`);
    dispatch({
      type: GET_ALL_EVENTS_SHOP_SUCCESS,
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EVENTS_SHOP_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_EVENT_REQUEST,
    });

    const { data } = await axios.delete(
      `http://localhost:3500/api/v2/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_EVENTS_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:3500/api/v2/event/get-all-events`);
    dispatch({
      type: GET_ALL_EVENTS_SUCCESS,
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EVENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
