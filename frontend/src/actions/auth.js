import axios from 'axios'
import  {USER_LOADING,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGOUT_SUCCESS,REGISTER_SUCCESS}  from './types'
export const loadUser = () => (dispatch,getState) => {
    ///user loading
    dispatch({type:USER_LOADING})
    axios.get('/api/user/',tokenConfig(getState))
         .then(res => {
             dispatch({
                 type:USER_LOADED,
                 payload:res.data
             })
         })
         .catch(err =>console.log(err))
}
export const login = (username,password) => dispatch => {
    //headers
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({username,password})
    axios.post("/api/login/",body,config)
         .then(res => {
             dispatch({
                 type:LOGIN_SUCCESS,
                 payload:res.data
             })
         })
         .catch(err =>console.log(err))
}
export const register = (username,password,email) => dispatch => {
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({username,password,email})
    axios.post("/api/register/",body,config)
         .then(res => {
             dispatch({
                 type:REGISTER_SUCCESS,
                 payload:res.data
             })
         })
         .catch(err =>console.log(err))
}
// ??LOGOUT USER
export const logout = () => (dispatch,getState) => {
    axios.post('/api/logout/',null,tokenConfig(getState))
         .then(res => {
             dispatch({
                 type:LOGOUT_SUCCESS
             })
         })
         .catch(err =>console.log(err))
}
export const tokenConfig = getState => {
    const token = getState().auth.token
    //headers
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    //if token + header config
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    return config
}