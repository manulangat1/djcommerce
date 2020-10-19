import React from 'react'
import ReactDOM from 'react-dom'
import HOC from '../hoc/HOC'
import { connect } from 'react-redux'
import {Link,withRouter,Redirect} from 'react-router-dom'
import {logout} from '../../actions/auth'
import {cartSuccess} from '../../actions/cart'
import { loadCategory } from '../../actions/products'
import '../styles/main.scss'
class Header extends React.Component{
    state = {
        search:""
    }
    componentDidMount(){
        this.props.cartSuccess()
        console.log(this.props.cart)
    }
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    
    onSubmit = e =>{
        e.preventDefault();
        const { search} = this.state
        // const search = "Sw"
        if(!this.props.auth.isAuthenticated){
            alert("You need to be authenticated to use this feature")
            return <Redirect to='/login' />
        } else{
        this.props.loadCategory(search)
        this.props.history.push('/search')
        }
        
        // return <Redirect to="/search" />
    }
    render(){
        const {isAuthenticated,user} = this.props.auth
        const { search } = this.state
        const authLinks = (
            <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <div class="dropdown">
                        <button class="dropbtn">
                        <i class="fas fa-shopping-cart fa-2x"></i>
                        </button>
                        <div class="dropdown-content">
                        <p>{`${ this.props.cart &&  this.props.cart.orderItems.length} items`}</p>
                        { this.props.cart && this.props.cart.orderItems.map(order_item => (
                            <div key={order_item.id}>
                                <p>{order_item.quantity} * {order_item.item}</p>
                            </div>
                        ))}
                        {this.props.cart &&  this.props.cart.orderItems.length < 1 ? (<p>No items</p>) : null}
                        <button className="primary-btn" onClick={() => this.props.history.push('/order-summary')}>Checkout</button>

                        </div>
                    </div>
                    </li>
                    <li>
                    </li>
                    <button onClick={this.props.logout} className="primary-btn">Logout</button>
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
            <section>
            <section id="heads">
                <div className="container">
                    <div id="branding">
                        <h1> <i class="fas fa-couch fa-5.5x"><span className="highlight"> Jenga </span> Hardware</i></h1>
                        
                    </div>
                    <nav>
                        {isAuthenticated ? authLinks:guestLinks}
                    </nav>
                </div>
            </section>
            {/* <header>
            <div className="container"> */}
                {/* <form onSubmit={this.onSubmit}>
            <input type="text" required className="form-control" value={search} name="search" onChange={this.onChange}  placeholder="search your favourite products" />
            <input type="submit" value="search" className="p-btn" />
            </form> */}
            {/* <nav>
            <ul>
                    <li>
                    <Link to="/home">Home Furniture</Link>
                    </li>
                    <li>
                    <Link to="/office">Office Furniture</Link>
                    </li>
                </ul>
            </nav> */}
            {/* </div>
            </header> */}
            </section>
        )
    }
}
// Header = HOC(Header)
const mapStateToProps = state=> ({
    auth:state.auth,
    cart:state.cart.cart
})
export default withRouter(connect(mapStateToProps,{logout,cartSuccess,loadCategory})(Header))