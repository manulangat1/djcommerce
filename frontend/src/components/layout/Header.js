import React from 'react'
import ReactDOM from 'react-dom'
import HOC from '../hoc/HOC'
import { connect } from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {logout} from '../../actions/auth'
import {cartSuccess} from '../../actions/cart'
class Header extends React.Component{
    componentDidMount(){
        this.props.cartSuccess()
        console.log(this.props.cart)
    }

    render(){
        const {isAuthenticated,user} = this.props.auth
        const authLinks = (
            <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                        <p>{`${ this.props.cart &&  this.props.cart.orderItems.length} items`}</p>
                        { this.props.cart && this.props.cart.orderItems.map(order_item => (
                            <div key={order_item.id}>
                                <p>{order_item.quantity} * {order_item.item}</p>
                            </div>
                        ))}
                        {this.props.cart &&  this.props.cart.orderItems.length < 1 ? (<p>No items</p>) : null}
                        <button onClick={() => this.props.history.push('/order-summary')}>Checkout</button>

                    </li>
                    <li>
                    <Link to="/register">register</Link>
                    </li>
                    <button onClick={this.props.logout}>Logout</button>
                </ul>
        )
        const guestLinks = (
            <ul>
                    <li>
                    <Link to="/login">Login</Link>
                    </li>
                    <li>
                    <Link to="/register">register</Link>
                    </li>
                </ul>
        )
        return (
            <div>
            <nav>
                {isAuthenticated ? authLinks:guestLinks}
            </nav>
        </div>
        )
    }
}
// Header = HOC(Header)
const mapStateToProps = state=> ({
    auth:state.auth,
    cart:state.cart.cart
})
export default withRouter(connect(mapStateToProps,{logout,cartSuccess})(Header))