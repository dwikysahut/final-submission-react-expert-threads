import { THREAD_DETAIL_ACTION, COMMENTS_ACTION } from '../actionType';

function threadDetailReducer(threads = null, action = {}) {
  console.log(action?.payload);
  switch (action.type) {
    case THREAD_DETAIL_ACTION.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case COMMENTS_ACTION.ADD_COMMENT:
      return { ...threads, comments: [action.payload?.comment, ...threads.comments] };
    case THREAD_DETAIL_ACTION.UP_VOTE_THREAD_DETAIL:
      return {
        ...threads,
        upVotesBy: threads.upVotesBy.includes(action.payload.vote.userId)
          ? threads.upVotesBy.filter((filterItem) => filterItem !== action.payload.vote.userId)
          : threads.upVotesBy.concat([action.payload.vote.userId]),
      };
    case THREAD_DETAIL_ACTION.DOWN_VOTE_THREAD_DETAIL:
      return {
        ...threads,
        downVotesBy: threads.downVotesBy.includes(action.payload.vote.userId)
          ? threads.downVotesBy.filter((filterItem) => filterItem !== action.payload.vote.userId)
          : threads.downVotesBy.concat([action.payload.vote.userId]),
      };
    case THREAD_DETAIL_ACTION.NEUTRAL_VOTE_THREAD_DETAIL:
      if (action.payload.vote.isUpVote) {
        return {
          ...threads,
          upVotesBy: threads.upVotesBy.includes(action.payload.vote.userId)
            ? threads.upVotesBy.filter((filterItem) => filterItem !== action.payload.vote.userId)
            : threads.upVotesBy.concat([action.payload.vote.userId]),
        };
      }

      return {
        ...threads,
        downVotesBy: threads.downVotesBy.includes(action.payload.vote.userId)
          ? threads.downVotesBy.filter((filterItem) => filterItem !== action.payload.vote.userId)
          : threads.downVotesBy.concat([action.payload.vote.userId]),
      };

    case COMMENTS_ACTION.UP_VOTE_COMMENT:
      return {
        ...threads,
        comments: threads.comments.map((item) => {
          if (item.id === action.payload.vote.commentId) {
            return {
              ...item,
              upVotesBy: item.upVotesBy.includes(action.payload.vote.userId)
                ? item.upVotesBy.filter((filterItem) => filterItem !== action.payload.vote.userId)
                : item.upVotesBy.concat([action.payload.vote.userId]),
            };
          }
          return item;
        }),
      };
    case COMMENTS_ACTION.DOWN_VOTE_COMMENT:
      return {
        ...threads,
        comments: threads.comments.map((item) => {
          if (item.id === action.payload.vote.commentId) {
            return {
              ...item,
              downVotesBy: item.downVotesBy.includes(action.payload.vote.userId)
                ? item.downVotesBy.filter((filterItem) => filterItem !== action.payload.vote.userId)
                : item.downVotesBy.concat([action.payload.vote.userId]),
            };
          }
          return item;
        }),
      };
    case COMMENTS_ACTION.NEUTRAL_VOTE_COMMENT:
      if (action.payload.vote.isUpVote) {
        return {
          ...threads,
          comments: threads.comments.map((item) => {
            console.log(action.payload.vote);
            if (item.id === action.payload.vote.commentId) {
              return {
                ...item,
                upVotesBy: item.upVotesBy.filter((filterItem) => filterItem !== action.payload.vote.userId),
              };
            }
            return item;
          }),
        };
      }
      return {
        ...threads,
        comments: threads.comments.map((item) => {
          console.log(action.payload.vote);
          if (item.id === action.payload.vote.commentId) {
            return {
              ...item,
              downVotesBy: item.downVotesBy.filter((filterItem) => filterItem !== action.payload.vote.userId),
            };
          }
          return item;
        }),
      };

    default:
      return threads;
  }
}

export default threadDetailReducer;
