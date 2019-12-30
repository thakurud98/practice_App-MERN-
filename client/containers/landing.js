import React, {Component} from 'react'
import {connect} from 'react-redux';
import sampleAction from '../containers/store/action/sampleAction'
class Landing extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
componentWillMount() {
   this.props.sampleAction()
}
    render(){
        console.log("props",this.props)
        return(
            <div class="container-fluid">
            <h2>Landing Page</h2>
            </div>
        )
    }
}
const masStateProps = state => ({
    porp:state.sampleReducer
})

export default connect(masStateProps,{sampleAction})(Landing)