import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import Footer from './layout/Footer'
import Header from './layout/Header'
import ProductList from './products/ProductList'
import ProductDetal from './products/ProductDetal'
import  OrderSummary  from "./products/OrderSummary";
import {Provider} from 'react-redux'
import store from '../store'
import Register from './auth/Register'
import Login from './auth/Login'
import  PrivateRoute  from "./common/PrivateRoute";
import { loadUser } from "../actions/auth";
import Checkout from './products/Checkout'
import Help from './layout/Help'
import About from './layout/About'
import Contact from './layout/Contact'
import './styles/main.scss'
import HomeF from './products/HomeF'
import Office from './products/Office'
import Search from './products/Search'
class App extends React.Component{
    componentDidMount(){
        store.dispatch(loadUser())
    }
    render(){
        return (
            <Provider store={store}>
            <Router>
            <div>
                <Header />
                <Switch>
                    <div className="main">
                        <PrivateRoute exact path="/" component={ProductList} />
                        <PrivateRoute exact path="/order-summary" component={OrderSummary} />
                        <PrivateRoute exact path="/products/:slug" component={ProductDetal} />
                        <PrivateRoute exact path="/checkout" component={Checkout} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/help" component={Help} />
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/home" component={HomeF} />
                        <Route exact path="/office" component={Office} />
                        <Route exact path="/search" component={Search} />
                    </div>
                </Switch>
                <Footer />
            </div>
            </Router>
            </Provider>
        )
    }
}
ReactDOM.render(<App />,document.getElementById('app'))