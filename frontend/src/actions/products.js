import { GET_ITEMS,ADD_TO_CART,GET_DETAILS } from './types'
import axios from 'axios'
import { tokenConfig } from "./auth";
export const getItems = () => (dispatch,getState) => {
    axios.get('/api/products/',tokenConfig(getState))
         .then(res =>{
             dispatch({
                 type:GET_ITEMS,
                 payload:res.data
             })
         } )
         .catch(err => console.log(err))
    
}
//ADD TO CART
export const addCart = slug => (dispatch,getState) => {
    // const slug = JSON.stringify(slug)
    axios.post('/api/add_to_cart/',{slug},tokenConfig(getState))
         .then(res => {
             dispatch({
                 type:ADD_TO_CART,
                 payload: res.data
             })
         })
         .catch(err => console.log(err))
}
export const prodDetail = slug => (dispatch,getState) => {
    axios.get(`/api/product/${slug}/`,tokenConfig(getState))
         .then(res => {
             dispatch({
                 type:GET_DETAILS,
                 payload:res.data
             })
         })
         .catch(err => console.log(err))
}