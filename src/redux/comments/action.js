import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { COMMENTS_ACTION } from '../actionType';

const postCommentActionCreator = (comment) => ({
  type: COMMENTS_ACTION.ADD_COMMENT,
  payload: { comment },
});
const postUpVoteCommentActionCreator = (vote) => ({
  type: COMMENTS_ACTION.UP_VOTE_COMMENT,
  payload: { vote },
});
const postDownVoteCommentActionCreator = (vote) => ({
  type: COMMENTS_ACTION.DOWN_VOTE_COMMENT,
  payload: { vote },
});
const postNeutralVoteCommentActionCreator = (vote) => ({
  type: COMMENTS_ACTION.NEUTRAL_VOTE_COMMENT,
  payload: { vote },
});

const asyncPostComment = (id, value) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const result = await api.postComment(id, { content: value });
    dispatch(postCommentActionCreator(result?.data?.data?.comment));
    alert(result?.data?.message);
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

const asyncUpVoteComment = (threadId, commentId) => async (dispatch) => {
  try {
    console.log(threadId, commentId);
    dispatch(showLoading());
    const result = await api.postUpVoteComment({ threadId, commentId });
    dispatch(postUpVoteCommentActionCreator({ ...result?.data?.data?.vote, commentId, threadId }));
  } catch (error) {
    console.log(error);

    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};
const asyncDownVoteComment = (threadId, commentId) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const result = await api.postDownVoteComment({ threadId, commentId });
    dispatch(postDownVoteCommentActionCreator(result?.data?.data?.vote));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};
const asyncNeutralVoteComment = ({ threadId, commentId, isUpVote = false }) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const result = await api.postNeutralVoteComment({ threadId, commentId });
    dispatch(postNeutralVoteCommentActionCreator({
      ...result?.data?.data?.vote, isUpVote, threadId, commentId,
    }));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export {
  asyncPostComment, asyncNeutralVoteComment, asyncDownVoteComment, asyncUpVoteComment,
};
