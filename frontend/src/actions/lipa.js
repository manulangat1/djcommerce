import { tokenConfig } from './auth'
import { LIPA_MPESA} from './types'
import axios from 'axios'

export const lipaMpesa = phone_no => (dispatch,getState) => {
    // console.log(tokenConfig(getState))
    // console.log(phone_no)
    phone_no = JSON.stringify({phone_no})
    // console.log(phone_no)
    axios
         .post("/api/mpesa/",phone_no,tokenConfig(getState))
         .then(res => {
             dispatch({
                 type:LIPA_MPESA,
                 payload:res.data
             })
         })
         .catch(err => console.log(err))
}