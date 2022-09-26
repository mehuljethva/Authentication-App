import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT, UPDATE_REQUEST,
} from '../types/auth';

import { DOMAIN } from '../constants';
import {LIST_FAIL, LIST_REQUEST, LIST_SUCCESS} from "../types/users";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.post(`${DOMAIN}/api/v1/accounts/login/`, { email, password }, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const editProfile = (firstName, lastName, email, password) => async (dispatch, getState) => {
  try {
     dispatch({
      type: LIST_REQUEST,
    });
     const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.patch(`${DOMAIN}/api/v1/accounts/users/`, config);

    dispatch({
      type: LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_FAIL,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const register = (firstName, lastName, email, password, repass) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${DOMAIN}/api/v1/accounts/register/`,
      { firstName, lastName, email, password, repass },
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: LOGOUT });
};
