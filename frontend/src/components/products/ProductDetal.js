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
                    <Carousel arrows value={this.state.value}
        onChange={this.onChange} >
                    <img src={product.pic} alt="an image" className="img-example"/>
                    <img src={product.pic1} alt="an image" className="img-example"/>
                    <img src={product.pic2} alt="an image" className="img-example"/>
                    </Carousel>
                    <Dots value={this.state.value} onChange={this.onChange} number={12} />
                 <div >
                <div className="container">
                    
                <h1>{product.title}</h1>
                {/* <h1>{pro.title}</h1> */}
                <p>{product.price} | {product.category}</p>
                <p>{product.description}</p>
                </div>
                </div>
                <div>
                    {
                     product.variations &&   product.variations.map(vars => (
                            <div key="vars.id">
                                <h1>{vars.name}</h1>
                                <div className="vars">
                                {
                                    vars.item_variations.map(iv => (
                                        <div>
                                            <h2>{iv.value}</h2>
                                            <img src={iv.attachment} alt="an image" className="imgs"/>
                                            
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        ))
                    }
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