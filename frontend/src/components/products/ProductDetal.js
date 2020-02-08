import React from 'react'
import { connect } from 'react-redux'
import {prodDetail} from '../../actions/products'

class ProductDetal extends React.Component{
    componentDidMount(){
        console.log(this.props.slug)
        if(this.props.slug){
            this.props.prodDetail(this.props.slug)
        } 
    }
    render(){
        const {product} = this.props
        return(
            <div>
                 <img src={product.pic} alt="an image" className="imgs"/>
                <h1>{product.title}</h1>
                {/* <h1>{pro.title}</h1> */}
                <p>{product.price} | {product.category}</p>
                <p>{product.description}</p>
            </div>
        )
    }
}
const mapStateToProps = (state,ownProps) => ({
    slug:ownProps.match.params.slug,
    product:state.products.product
})
export default connect(mapStateToProps,{prodDetail})(ProductDetal)