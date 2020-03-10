import React from 'react'
import { CardElement,injectStripe,Elements,StripeProvider} from 'react-stripe-elements'
import { connect } from 'react-redux'
// import {connect } from 'react-redux'
import { getItems,addCart} from '../../actions/products'
import {cartSuccess,cartUpdate} from '../../actions/cart'
import {lipaMpesa} from '../../actions/lipa'
class Checkout extends React.Component{
    state = {
        phone_no:''
    }
    onClick = () => {
        console.log("hello")
        this.props.lipaMpesa()
    }
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = e => {
        e.preventDefault()
        const { phone_no }= this.state
        this.props.lipaMpesa(phone_no)
        console.log("hello")
    }

    render(){
        const { phone_no }= this.state
        return(
            <section id="checks">
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <label>Your Number</label>
                        <input type="text" placeholder="2547*****" required onChange={this.onChange} name="phone_no" className="form-control" value={phone_no} />
                        <div className="summary-details">
                        <h1>Total:{this.props.cart.total}</h1>
                            <p>Kindly choose your payment option:</p>
                            {/* <button onClick={this.onClick}>Lipa na mpesa</button> */}
                            <button className="primary-btn">Submit</button>
                        </div>
                    </form>
                    
                </div>
            </section>
        )
    }
}
const mapStateToProps = state =>({
    // products :state.products.products
    cart:state.cart.cart
})
export default connect(mapStateToProps,{cartSuccess,cartUpdate,lipaMpesa})(Checkout)