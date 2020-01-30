import React from 'react'
import ReactDOM from 'react-dom'
import HOC from '../hoc/HOC'
// impo from "../../actions/auth";
import {login} from '../../actions/auth'
import { connect } from "react-redux";
import {Link,Redirect} from 'react-router-dom'
import '../styles/main.scss'
class Login extends React.Component{
    state = {
        username:'',
        password:''
    }
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    
    onSubmit = e =>{
        e.preventDefault();
        // this.props.login(this.state.username,this.state.password)
        this.props.login(this.state.username,this.state.password)
    }
    render(){
        if (this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        const {username,password} = this.state
        return(
            <main className="login">
                <div>
                    
                    
                    <form onSubmit={this.onSubmit} className="utility">
                    {/* <fieldset>
                        <legend>Uswr login</legend> */}
                        <div>
                            <label className="label">Username</label>
                            <input required className="form-control" type="text" value={username} placeholder="enter" name="username" onChange={this.onChange} />
                        </div>
                        <div>
                            <label className="label">password</label>
                            <input required className="form-control" type="password" value={password} placeholder="enter" name="password" onChange={this.onChange}/>
                        </div>
                        <button className="primary-btn">Login</button>
                        <p>Dont have an account? <Link to="/register">Register here</Link></p>
                        {/* </fieldset> */}
                    </form>
                    
                </div>
            </main>
        )
    }
}
// Login = HOC(Login)
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login)