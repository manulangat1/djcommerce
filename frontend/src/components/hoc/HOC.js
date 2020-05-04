import React from 'react'

export default function HOC(HocComponent){
    return class extends React.Component{
        componentDidMount(){
            console.log("hell")
            // this.props.getItems()
        }
        onChange = e => {
            this.setState({[e.target.name]:e.target.value})
            console.log(e.target.value)
        }
        onSubmit = e =>{
            e.preventDefault();
        }
        render(){
            return (
                <div>
                    <HocComponent {...this.props} />
                </div>
            )
        }
    }
}