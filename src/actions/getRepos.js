import { GET_REPOS, LOADING_REPOS, ERR_LOADING_REPOS } from './actionTypes';
import { getReposApi } from '../api'

export const getRepos = (userName, query) => dispatch => {
    dispatch({
        type: LOADING_REPOS,
    })
    getReposApi(userName, query).then(data => {
        dispatch({
            type: GET_REPOS,
            payload: data.items
        })
    }).catch(err => {
        
        dispatch({
            type: ERR_LOADING_REPOS,
            payload : {
                repos : []
            }
        })
    })
}