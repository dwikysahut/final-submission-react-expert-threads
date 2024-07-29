import { LEADERBOARDS_ACTION } from '../actionType';

/**
 * @TODO: Define the reducer for the authUser state
 */
function leaderboardsReducer(leaderboards = [], action = {}) {
  switch (action.type) {
    case LEADERBOARDS_ACTION.RECEIVE_LEADERBOARDS:
      return action.payload.leaderboards;

    default:
      return leaderboards;
  }
}

export default leaderboardsReducer;
