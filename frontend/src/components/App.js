import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import Footer from './layout/Footer'
import Header from './layout/Header'
import ProductList from './products/ProductList'
import  OrderSummary  from "./products/OrderSummary";
import {Provider} from 'react-redux'
import store from '../store'
import Register from './auth/Register'
import Login from './auth/Login'
import  PrivateRoute  from "./common/PrivateRoute";
import { loadUser } from "../actions/auth";
import './styles/main.scss'
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
                        <div className="container">
                        <PrivateRoute exact path="/" component={ProductList} />
                        <PrivateRoute exact path="/order-summary" component={OrderSummary} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        </div>
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