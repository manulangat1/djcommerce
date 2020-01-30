import React from 'react'
import HOC from '../hoc/HOC'
import '../styles/main.scss'
class Footer extends React.Component{
    render(){
        return(
       <div className="footer">
           <p>copy &copy; 2020</p>
       </div>
        )
    }
}
Footer = HOC(Footer)
export default Footer