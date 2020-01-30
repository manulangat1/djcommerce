import React from 'react'
import ReactDOM from 'react-dom'
import HOC from '../hoc/HOC'
import {connect } from 'react-redux'
import { getItems,addCart} from '../../actions/products'
import {cartSuccess} from '../../actions/cart'
import '../styles/main.scss'
class ProductList extends React.Component{
    componentDidMount(){
        this.props.getItems()
    }
    // handleAddToCart = handleAddToCart.bind(this)
    handleAddToCart = (slug) => {
        console.log(slug)
        this.props.addCart(slug)
        this.props.cartSuccess()
    }
    render(){
        return (
            <div id="products">
                <div id="grid-products">
                {
                    this.props.products.map(product => (
                        <div key={product.id} className="product">
                            {/* <h1>{product.title}</h1> */}
                            <div >
                                <img src={product.pic} alt="an image" className="imgs"/>
                            </div>
                            <div>
                            <h1>{product.title}</h1>
                            {product.discount_price && (<label className={product.label}>Limited</label>)}
                            <p>{product.price} | {product.category}</p>
                            <p>{product.description}</p>
                            <button className="secondary-btn" onClick={() => this.handleAddToCart(product.slug)}>Add  to cart</button>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>({
    products :state.products.products,
    cart:state.cart.cart
})
export default HOC(connect(mapStateToProps,{getItems,addCart,cartSuccess})(ProductList))
