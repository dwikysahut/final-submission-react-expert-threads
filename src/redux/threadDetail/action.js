/* eslint-disable import/prefer-default-export */
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { THREAD_DETAIL_ACTION } from '../actionType';

const getAllThreadDetailActionCreator = (threadDetail) => ({
  type: THREAD_DETAIL_ACTION.RECEIVE_THREAD_DETAIL,
  payload: { threadDetail },
});

const asyncGetThread = (id) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const result = await api.getThread(id);
    dispatch(getAllThreadDetailActionCreator(result?.data?.data?.detailThread));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export { asyncGetThread, getAllThreadDetailActionCreator };
