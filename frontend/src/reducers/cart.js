import { CART_START,CART_SUCCESS,CART_FAIL,CART_LOGOUT,CART_UPDATE,LIPA_MPESA,CART_NO} from '../actions/types'
const initialState = {
    cart:null,
    carts:null
}

export default function(state=initialState,action){
    switch(action.type){
        case CART_SUCCESS:
            return{
                ...state,
                cart:action.payload
            }
        case CART_UPDATE:
            return{
                ...state
            }
        case LIPA_MPESA:
        case CART_NO:
            return{
                ...state
            }
        default:
            return state
    }
}