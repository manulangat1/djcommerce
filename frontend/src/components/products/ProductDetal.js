import React from 'react'
import { connect } from 'react-redux'
import {prodDetail,getItems,addCart} from '../../actions/products'
import '../styles/main.scss'
import Carousel , { Dots }from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import {cartSuccess} from '../../actions/cart'
class ProductDetal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          value: 0,
        };
      }
      
      onChange = value => this.setState({ value });
    componentDidMount(){
        console.log(this.props.slug)
        if(this.props.slug){
            this.props.prodDetail(this.props.slug)
        } 
    }
    handleAddToCart = (slug) => {
        console.log(slug)
        this.props.addCart(slug)
        this.props.cartSuccess()
    }
    render(){
        const {product} = this.props
        return(
            <section className="detail">
                <div className="prod">
                    <div className="prod-img">
                    <Carousel arrows value={this.state.value}  onChange={this.onChange} >
                    <img src={product.pic} alt="an image" className="img-example"/>
                    <img src={product.pic1} alt="an image" className="img-example"/>
                    <img src={product.pic2} alt="an image" className="img-example"/>
                    </Carousel>
                    <Dots value={this.state.value} onChange={this.onChange} number={3} />
                    </div>
                 <div >
                <div className="container">
                <h1>Title:{product.title}</h1>
                <p>Specs:{product.price} | {product.category}</p>
                <p>Product description{product.description}</p>
                <button className="primary-btn" onClick={() => this.handleAddToCart(product.slug)}>Add  to cart</button>
                </div>
                </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = (state,ownProps) => ({
    slug:ownProps.match.params.slug,
    product:state.products.product
})
export default connect(mapStateToProps,{prodDetail,addCart,cartSuccess})(ProductDetal)