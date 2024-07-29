import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { AUTH_USER } from '../actionType';

const setAuthActionCreator = (authUser) => ({
  type: AUTH_USER.SET_AUTH_USER,
  payload: { authUser, isPreload: true },
});
const unsetAuthActionCreator = () => ({
  type: AUTH_USER.SET_AUTH_USER,
  payload: { authUser: null },
});
const preloadActionCreator = () => ({
  type: AUTH_USER.PRE_LOAD,
  payload: { isPreload: false },
});

const fetchMe = () => async (dispatch) => {
  try {
    const result = await api.getOwnProfile();
    dispatch(setAuthActionCreator(result?.data?.data));
  } catch (error) {
    dispatch(unsetAuthActionCreator());
  } finally {
    dispatch(preloadActionCreator());
  }
};
const asyncRegisterAuthUser = ({ email, name, password }) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const response = await api.register({ email, name, password });
    console.log(response);
  } catch (error) {
    console.log(error);
    alert(error?.response?.data?.message);
  } finally {
    dispatch(hideLoading());
  }
};

const asyncLoginAuthUser = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const response = await api.login({ email, password });
    localStorage.setItem('accesstoken', response?.data?.data?.token);

    if (response?.data?.data?.token) {
      const result = await api.getOwnProfile();
      dispatch(setAuthActionCreator(result?.data?.data));
    }
    alert(response?.data?.status);
  } catch (error) {
    alert(error?.response?.data?.message);
  } finally {
    dispatch(hideLoading());
  }
};
const asyncLogoutAuthUser = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    localStorage.removeItem('accesstoken');
    dispatch(unsetAuthActionCreator());
    alert('berhasil logout');
  } catch (error) {
    alert(error?.response?.data?.message);
  } finally {
    dispatch(hideLoading());
  }
};

export {
  asyncRegisterAuthUser, asyncLoginAuthUser, fetchMe, asyncLogoutAuthUser,
};
