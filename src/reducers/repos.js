
import { GET_REPOS, LOADING_REPOS, ERR_LOADING_REPOS } from '../actions/actionTypes';

const INITIAL_STATE = {
    repos: [],
    isLoading: true,
    hasError: false,
}

export default (state = INITIAL_STATE, action) => {

    const { payload } = action;

    switch (action.type) {
        case GET_REPOS:
            return { ...state, repos: payload, isLoading: false, hasError: false };
        case LOADING_REPOS:
            return { ...state, ...payload, isLoading: true };
        case ERR_LOADING_REPOS:
            return { ...state, ...payload, isLoading: false, hasError: true };
        default:
            return state;
    }
}