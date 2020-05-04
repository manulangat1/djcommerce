import React from 'react'
import HOC from '../hoc/HOC'
import '../styles/main.scss'
import { Link } from 'react-router-dom'
class Footer extends React.Component{
    render(){
        return(
       <div className="footer">
           <p>copy &copy; 2020</p>
           <p><Link to="/help">Help</Link> | <Link to='/about'>About Us</Link> | <Link to="/contact">Contact Us</Link></p>
       </div>
        )
    }
}
Footer = HOC(Footer)
export default Footer