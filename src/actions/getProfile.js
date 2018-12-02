import { GET_PROFILE } from './actionTypes';
import { getProfileApi } from '../api'

export const getProfile = (userName) => dispatch => {

    getProfileApi(userName).then(data => {
        dispatch({
            type: GET_PROFILE,
            payload: data
        })
    })
}