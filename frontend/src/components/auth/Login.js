import React from "react";
import ReactDOM from "react-dom";
import HOC from "../hoc/HOC";
// impo from "../../actions/auth";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "../styles/main.scss";
class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    // this.props.login(this.state.username,this.state.password)
    this.props.login(this.state.username, this.state.password);
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;
    return (
      <main id="wrapper">
        <div id="left">
          <div id="signin">
            <div className="logo">
              <h1>Log in</h1>
            </div>
            <form onSubmit={this.onSubmit} className="utility">
              <div>
                <label className="label">Username</label>
                <input
                  required
                  placeholder="enter your username here"
                  className="form-control"
                  type="text"
                  value={username}
                  name="username"
                  onChange={this.onChange}
                />
              </div>
              <div>
                <label className="label">password</label>
                <input
                  required
                  placeholder="enter your password here"
                  className="form-control"
                  type="password"
                  value={password}
                  name="password"
                  onChange={this.onChange}
                />
              </div>
              <button className="primary-btn" type="submit">
                Login
              </button>
              <div className="links">
                {/* <Link to="/register">Register here</Link> */}
              </div>
              <div className="or">
                <hr className="bar"></hr>
                <span>OR</span>
                <hr className="bar"></hr>
              </div>
              <Link to="/register" className="secondary-btn">
                Create an Account
              </Link>
            </form>
          </div>
        </div>
        <div id="right">
          <div id="showcase">
            <div className="showcase-content">
              <h1 className="showcase-text">
                LisheFood Connect
                <a href="" className="secondary-btn">
                  Learn More
                </a>
              </h1>
            </div>
          </div>
        </div>
        <div></div>
      </main>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
