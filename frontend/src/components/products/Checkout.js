import React from 'react'
import { CardElement,injectStripe,Elements,StripeProvider} from 'react-stripe-elements'

class Checkout extends React.Component{
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this)
    }
    async submit(e){

    }
    render(){
        return(
            <StripeProvider>
            <div className="checkout">
                <CardElement />
             <button onClick={thus.submit}>Send</button>
            </div>
            </StripeProvider>
        )
    }
}
export default injectStripe(Checkout)