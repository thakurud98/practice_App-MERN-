import React,{Component} from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import SignUpPage from './containers/signup'
import LogInPage from './containers/login'

export default class ProjectRouter extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <Router history={history}>
				<div className="row mrbt">
				{/* <Loading/> */}
					<Switch>
						<Route exact path='/signup' component={SignUpPage} />
						<Route exact path='/login' component={LogInPage} />
					</Switch>
				</div>
			</Router >

        )
    }
}