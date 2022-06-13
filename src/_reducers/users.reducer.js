// Users reducer handles the users portion of the application state
// it is used to display a list of users and enable deleting of users
// from the homepage 
import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch(action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}