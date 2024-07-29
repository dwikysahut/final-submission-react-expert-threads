import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { THREAD_DETAIL_ACTION, THREADS_ACTION } from '../actionType';

const getAllThreadsActionCreator = (threads) => ({
  type: THREADS_ACTION.RECEIVE_THREADS,
  payload: { threads },
});
const postThreadActionCreator = (thread) => ({
  type: THREADS_ACTION.ADD_THREAD,
  payload: { thread },
});
const postUpVoteThreadActionCreator = (vote) => ({
  type: THREADS_ACTION.UP_VOTE_THREAD,
  payload: { vote },
});
const postUpVoteDetailThreadActionCreator = (vote) => ({
  type: THREAD_DETAIL_ACTION.UP_VOTE_THREAD_DETAIL,
  payload: { vote },
});
const postDownVoteThreadActionCreator = (vote) => ({
  type: THREADS_ACTION.DOWN_VOTE_THREAD,
  payload: { vote },
});
const postDownVoteDetailThreadActionCreator = (vote) => ({
  type: THREAD_DETAIL_ACTION.DOWN_VOTE_THREAD_DETAIL,
  payload: { vote },
});
const postNeutralVoteThreadActionCreator = (vote) => ({
  type: THREADS_ACTION.NEUTRAL_VOTE_THREAD,
  payload: { vote },
});
const postNeutralVoteDetailThreadActionCreator = (vote) => ({
  type: THREAD_DETAIL_ACTION.NEUTRAL_VOTE_THREAD_DETAIL,
  payload: { vote },
});

const asyncGetAllThreads = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    const result = await api.getAllThreads();
    const resultUsers = await api.getAllUsers();
    const newResult = result.data?.data?.threads?.map((item) => ({
      ...item,
      owner: resultUsers.data.data.users.find((user) => user.id === item.ownerId),
    }));
    dispatch(getAllThreadsActionCreator(newResult));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};
const asyncPostThread = (value) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const result = await api.postThread(value);
    dispatch(postThreadActionCreator(result?.data?.data?.thread));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};
const asyncUpVoteThread = (id, isDetail) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const result = await api.postUpVote(id);
    if (isDetail) {
      dispatch(postUpVoteDetailThreadActionCreator({ ...result?.data?.data?.vote }));
    } else {
      dispatch(postUpVoteThreadActionCreator({ ...result?.data?.data?.vote }));
    }
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};
const asyncDownVoteThread = (id, isDetail) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const result = await api.postDownVote(id);
    if (isDetail) {
      dispatch(postDownVoteDetailThreadActionCreator({ ...result?.data?.data?.vote }));
    } else {
      dispatch(postDownVoteThreadActionCreator({ ...result?.data?.data?.vote }));
    }
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};
const asyncNeutralVoteThread = ({ id, isUpVote = false, isDetail }) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const result = await api.postNeutralVote(id);
    if (isDetail) {
      dispatch(postNeutralVoteDetailThreadActionCreator({ ...result?.data?.data?.vote, isUpVote }));
    } else {
      dispatch(postNeutralVoteThreadActionCreator({ ...result?.data?.data?.vote, isUpVote }));
    }
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export {
  asyncGetAllThreads, asyncPostThread, asyncUpVoteThread, asyncDownVoteThread, asyncNeutralVoteThread, getAllThreadsActionCreator,
};
