import profile from './profile';
import repos from './repos';
import { combineReducers } from 'redux';

const userName = window.location.pathname.split('/')[1] || 'veekays';


const initReducer = (state) => ({ ...state, userName });

const rootReducer = combineReducers({
    profile: profile, repos: repos,
    userName: initReducer,
})
export default rootReducer

