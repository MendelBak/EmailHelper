import { FETCH_USER } from '../actions/types';

// state = null to default to a null state instead of logged in/logged out.
export default function (state = null, action) {
  switch (action.type) {
    // If FETCH_USER returns a value (a logged in user) return it, otherwise, return 'false'.
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
