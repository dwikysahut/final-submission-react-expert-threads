import { AUTH_USER } from '../actionType';

/**
 * @TODO: Define the reducer for the authUser state
 */
function authUserReducer(authUser = { user: null, isPreload: true }, action = {}) {
  switch (action.type) {
    case AUTH_USER.SET_AUTH_USER:
      return action.payload.authUser;
    case AUTH_USER.UNSET_AUTH_USER:
      return null;
    case AUTH_USER.PRE_LOAD:
      console.log(action.payload.isPreload);

      return { ...authUser, isPreload: action.payload.isPreload };
    default:
      return { ...authUser };
  }
}

export default authUserReducer;
