import { tokenConfig } from './auth'
import { LIPA_MPESA} from './types'
import axios from 'axios'

export const lipaMpesa = () => (dispatch,getState) => {
    console.log(tokenConfig(getState))
    axios
         .post('/api/mpesa/',tokenConfig(getState))
         .then(res => {
             dispatch({
                 type:LIPA_MPESA,
                 payload:res.data
             })
         })
         .catch(err => console.log(err))
}