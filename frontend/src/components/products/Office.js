import React from 'react'
import { connect } from 'react-redux'
import { loadCategory } from '../../actions/products'
import { Link,Redirect} from 'react-router-dom'

class Office extends React.Component{
    search = "Sw"
    handleAddToCart = (slug) => {
        console.log(slug)
        this.props.addCart(slug)
        this.props.cartSuccess()
    }
    componentDidMount(){
        const search = "OFFICE"
        this.props.loadCategory(search)
    }
    render(){
        const search = "Sw"
        if(!this.props.auth.isAuthenticated){
            alert("You need to be authenticated to view this page")
            return <Redirect to='/login' />
        } 
        return(
            <section id="products">
                <div id="grid-products">
                {
                  this.props.categories ?  this.props.categories.map(product => (
                        <div key={product.id} className="product">
                            {/* <h1>{product.title}</h1> */}
                            <div >
                                <img src={product.pic} alt="an image" className="imgs"/>
                            </div>
                            <div>
                            <h1><Link to={`/products/${product.slug}/`}>{product.title}</Link></h1>
                            {product.discount_price && (<label className={product.label}>Limited</label>)}
                            <p>{product.price} | {product.category}</p>
                            <p>{product.description}</p>
                            <button className="primary-btn" onClick={() => this.handleAddToCart(product.slug)}>Add  to cart</button>
                            </div>
                        </div>
                    ))
                    : "nothing to display"
                    // <div id="products">
                    //     <h1>there are no itesm to be displayed at the moment</h1>
                    // </div>
                }
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    categories:state.products.categories,
    auth:state.auth
})
export default connect(mapStateToProps,{loadCategory})(Office)