import React from 'react'
import ReactDOM from 'react-dom'
import HOC from '../hoc/HOC'
import {connect } from 'react-redux'
import { getItems,addCart} from '../../actions/products'
import {cartSuccess} from '../../actions/cart'
class OrderSummary extends React.Component{
    componentDidMount(){
        this.props.cartSuccess()
    }
    // // handleAddToCart = handleAddToCart.bind(this)
    // handleAddToCart = (slug) => {
    //     console.log(slug)
    //     this.props.addCart(slug)
    // }
    render(){
        return (
            <div className="container">
                <h1>Order Sumary</h1>
                <table>
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
                        <tr key={ order_item.in }>
                        <td>{ order_item.id }</td>
                        <td>{ order_item.item }</td>
                        <td>{ order_item.quantity}</td>
                        <td>{ order_item.final_price }</td>
                        <td>  x </td>
                        {/* <td>{ droplet.disk }</td> */}
                        </tr>
                        // <div>
                        //     <h1>{order_item.item}</h1>
                        //     <p>{order_item.quantity}</p>
                        //     <p>{order_item.item_obj.discount_price && ( <p>ON DISCOUNT</p>)  }</p>
                        //     <p>{order_item.final_price}</p>
                        // </div>
                    ))
                }
        {/* { (droplets.length > 0) ? droplets.map( (droplet, index) => {
           return (
            <tr key={ index }>
              <td>{ droplet.id }</td>
              <td>{ droplet.name }</td>
              <td>{ droplet.region.slug}</td>
              <td>{ droplet.memory }</td>
              <td>{ droplet.vcpus }</td>
              <td>{ droplet.disk }</td>
            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> } */}
      </tbody>
    </table>
                {/* {
                    this.props.cart.orderItems.map(order_item => (
                        <div>
                            <h1>{order_item.item}</h1>
                            <p>{order_item.quantity}</p>
                            <p>{order_item.item_obj.discount_price && ( <p>ON DISCOUNT</p>)  }</p>
                            <p>{order_item.final_price}</p>
                        </div>
                    ))
                } */}
                <h1>Total:{this.props.cart.total}</h1>
                <p>Kindly choose your payment option:</p>
                <button>Lipa na mpesa</button>
            </div>
        )
    }
}
const mapStateToProps = state =>({
    // products :state.products.products
    cart:state.cart.cart
})
export default HOC(connect(mapStateToProps,{cartSuccess})(OrderSummary))
// export default OrderSummary
