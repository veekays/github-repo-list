
import { GET_PROFILE } from '../actions/actionTypes';

const INITIAL_STATE = {
    name: 'profile'
}

export default (state = INITIAL_STATE, action) => {

    const { payload } = action;
    switch (action.type) {
        case GET_PROFILE:
            return { ...state, ...payload };

        default:
            return state;
    }
}