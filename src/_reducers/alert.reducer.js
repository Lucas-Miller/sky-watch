// Redux alert reducer which is responsible for managing the applications state
// for alerts/toaster notifications. It's state is updated when an alert action
// is dispatched anywhere in the application.

import { alertConstants } from '../_constants';

export function alert(state = {}, action) {
    switch (action.type) {
    case alertConstants.SUCCESS:
        return {
        type: 'alert-success',
        message: action.message
        };
    case alertConstants.ERROR:
        return {
        type: 'alert-danger',
        message: action.message
        };
    case alertConstants.CLEAR:
        return {};
    default:
        return state
    }
}