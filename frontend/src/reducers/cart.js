import { CART_START,CART_SUCCESS,CART_FAIL,CART_LOGOUT} from '../actions/types'
const initialState = {
    cart:null,
}

export default function(state=initialState,action){
    switch(action.type){
        case CART_SUCCESS:
            return{
                ...state,
                cart:action.payload
            }
        default:
            return state
    }
}