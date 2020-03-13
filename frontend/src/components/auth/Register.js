import React from 'react'
import ReactDOM from 'react-dom'
import HOC from '../hoc/HOC'
import {Link,Redirect} from 'react-router-dom'
import {register} from '../../actions/auth'
import { connect } from 'react-redux'
class Register extends React.Component{
    state = {
        username:'',
        email:'',
        password:'',
        password2:''
    }
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    
    onSubmit = e =>{
        e.preventDefault();
        const {username,password,email,password2} = this.state
        if(password !== password2){
            alert("passwords do not match")
        }
        else{
            this.props.register(username,password,email)
        }
    }
    render(){
        if (this.props.isAuthenticated){
            return <Redirect to="/"/>
        }
        const {username,password,email,password2} = this.state
        return(
            <main className="register">
                <div className="container">
                    <form onSubmit={this.onSubmit} className="utility">
                        <div>
                        <div>
                            <label className="label">Username</label>
                            <input required className="form-control" type="text" value={username} placeholder="enter name" name="username" onChange={this.onChange} />
                        </div>
                        <div>
                            <label className="label">email</label>
                            <input required className="form-control" type="email" value={email} placeholder="enter email" name="email" onChange={this.onChange} />
                        </div>
                        <div>
                            <label className="label">password</label>
                            <input required className="form-control" type="password" value={password} placeholder="enter password" name="password" onChange={this.onChange} />
                        </div>
                        <div>
                            <label className="label">passwords</label>
                            <input required className="form-control" type="password" value={password2} placeholder="enter password2" name="password2"onChange={this.onChange} />
                        </div>
                        </div>
                        <button className="primary-btn">Register</button>
                        <p>Already have an account? <Link to="/login">Login here</Link></p>
                    </form>
                </div>
            </main>
        )
    }
}
// Register = HOC(Register)
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{register})(Register)