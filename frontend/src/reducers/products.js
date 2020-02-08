import { GET_ITEMS, ADD_TO_CART, GET_DETAILS } from "../actions/types";

const initialState = {
    products:[],
    cart:[],
    product:[]
}
export default function(state=initialState,action){
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                products:action.payload
            }
        case ADD_TO_CART:
            return{
                ...state,
                // products:[]
                cart:action.payload
            }
        case GET_DETAILS:
            return{
                ...state,
                product:action.payload
            }
        default:
            return state
    }
}