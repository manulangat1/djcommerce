import React from 'react'
import ReactDOM from 'react-dom'
import HOC from '../hoc/HOC'
import '../styles/main.scss'
import {connect } from 'react-redux'
import { getItems,addCart} from '../../actions/products'
import {cartSuccess} from '../../actions/cart'
class OrderSummary extends React.Component{
    componentDidMount(){
        this.props.cartSuccess()
    }
    onClick = e => {
        console.log("hello")
    }
    render(){
        return (
            <section className="summary">
            <div className="container">
                <h1>Order Sumary</h1>
                <table id="customers">
      <thead>
        <tr>
          <th>Id</th>
          <th>Item Name</th>
          <th>Item quantity</th>
          <th>Total price</th>
          <th>Remove</th>
          {/* <th>Disk Size</th> */}
        </tr>
      </thead>
      <tbody>
      {
                    this.props.cart.orderItems.map(order_item => (
                        <tr key={ order_item.id }>
                        <td>{ order_item.id }</td>
                        <td>{ order_item.item }</td>
                        <td>{ order_item.quantity}
                            {/* <input type="number" /> */}
                        </td>
                        <td>{ order_item.final_price }</td>
                        <td>  x </td>
                        </tr>
                    ))
                }
      </tbody>
    </table>
            <div className="summary-details">
                <h1>Total:{this.props.cart.total}</h1>
                    <p>Kindly choose your payment option:</p>
                    <button onClick={this.onClick}>Lipa na mpesa</button>
                </div>
            </div>
            </section>
        )
    }
}
const mapStateToProps = state =>({
    // products :state.products.products
    cart:state.cart.cart
})
export default HOC(connect(mapStateToProps,{cartSuccess})(OrderSummary))
