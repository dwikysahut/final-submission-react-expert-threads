import { THREADS_ACTION } from '../actionType';

/**
 * @TODO: Define the reducer for the authUser state
 */
function threadsReducer(threads = [], action = {}) {
  console.log(threads);
  switch (action.type) {
    case THREADS_ACTION.RECEIVE_THREADS:
      return action.payload.threads;
    case THREADS_ACTION.ADD_THREADS:
      return [...threads, action.payload.thread];
    case THREADS_ACTION.UP_VOTE_THREAD:

      return threads?.map((item) => {
        console.log(item);

        if (item.id === action.payload.vote.threadId) {
          return {
            ...item,
            upVotesBy: item.upVotesBy.includes(action.payload.vote.userId)
              ? item.upVotesBy.filter((filterItem) => filterItem !== action.payload.vote.userId)
              : item.upVotesBy.concat([action.payload.vote.userId]),
          };
        }
        return item;
      });
    case THREADS_ACTION.DOWN_VOTE_THREAD:
      return threads?.map((item) => {
        if (item.id === action.payload.vote.threadId) {
          return {
            ...item,
            downVotesBy: item.downVotesBy.includes(action.payload.vote.userId)
              ? item.downVotesBy.filter((filterItem) => filterItem !== action.payload.vote.userId)
              : item.downVotesBy.concat([action.payload.vote.userId]),
          };
        }
        return item;
      });
    case THREADS_ACTION.NEUTRAL_VOTE_THREAD:
      console.log(action.payload.vote.isUpVote);

      if (action.payload.vote.isUpVote) {
        return threads?.map((item) => {
          if (item.id === action.payload.vote.threadId) {
            return {
              ...item,
              upVotesBy: item.upVotesBy.filter((filterItem) => filterItem !== action.payload.vote.userId),
            };
          }
          return item;
        });
      }
      console.log(action.payload.vote.isUpVote);
      return threads?.map((item) => {
        if (item.id === action.payload.vote.threadId) {
          return {
            ...item,
            downVotesBy: item.downVotesBy.filter((filterItem) => filterItem !== action.payload.vote.userId),
          };
        }
        return item;
      });

    default:
      return threads;
  }
}

export default threadsReducer;
