import React from 'react'
import { connect } from 'react-redux'
import {prodDetail} from '../../actions/products'
import '../styles/main.scss'
import Carousel , { Dots }from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
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
                <h1>{product.title}</h1>
                {/* <h1>{pro.title}</h1> */}
                <p>{product.price} | {product.category}</p>
                <p>{product.description}</p>
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
export default connect(mapStateToProps,{prodDetail})(ProductDetal)