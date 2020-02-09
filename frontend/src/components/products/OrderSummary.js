import React from 'react'
import ReactDOM from 'react-dom'
import HOC from '../hoc/HOC'
import '../styles/main.scss'
import {connect } from 'react-redux'
import { getItems,addCart} from '../../actions/products'
import {cartSuccess,cartUpdate} from '../../actions/cart'
import {lipaMpesa} from '../../actions/lipa'
import axios from 'axios'
class OrderSummary extends React.Component{
    state = {
        quantity:0
    }
    componentDidMount(){
        this.props.cartSuccess()
        console.log(this.state)
    }
    onClick = () => {
        console.log("hello")
        this.props.lipaMpesa()
    }
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state.quantity)
    }
    onDelete = id => {
        console.log("Hello")
        console.log(id)
        this.props.cartUpdate(id)
        this.props.cartSuccess()
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
                        <td>
                            
                            <input type="number" defaultValue={ order_item.quantity} onChange={this.onChange} name="quantity"/>
                        </td>
                        <td>{ order_item.final_price }</td>
                        <td>
                            <button className="primary-btn" onClick={() => this.onDelete(order_item.id)}>x</button> 
                             </td>
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
export default HOC(connect(mapStateToProps,{cartSuccess,cartUpdate,lipaMpesa})(OrderSummary))
