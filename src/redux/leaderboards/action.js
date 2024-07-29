/* eslint-disable import/prefer-default-export */
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { LEADERBOARDS_ACTION } from '../actionType';

const getAllLeaderboards = (leaderboards) => ({
  type: LEADERBOARDS_ACTION.RECEIVE_LEADERBOARDS,
  payload: { leaderboards },
});

const asyncGetAllLeaderboards = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    const result = await api.getAllLeaderboards();
    dispatch(getAllLeaderboards(result?.data?.data?.leaderboards));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export { asyncGetAllLeaderboards };
