import React,{Component} from 'react'
import {Link} from 'react-router-dom'
class LogIn extends Component {
    constructor(props){
        super(props)
        this.state={
            user:{
                password: '',
                email: '',
            }
        }
    }

    setValue(e){
        e.preventDefault()
        let key = e.target.value
        let name = e.target.name
        let Obj = {}
        Object.assign(Obj, this.state.user)
        Obj[name] = key
        this.setState({user: Obj})
    }

    LoginUser(e){
        e.preventDefault()
        console.log("state in submit========", this.state)
    }

    render(){
        console.log("state login===========", this.state)
        let {user} = this.state
        return(
            <div className="ui container">
                <form className="ui form" onSubmit={(e)=>this.LoginUser(e)}>
                    <div className="field">
                        <label>Email</label>
                        <input type="email"  value={user.email} name="email" placeholder="abc@xyz.com" onChange={(e)=>this.setValue(e)}/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" value={user.password} name="password" placeholder="********" onChange={(e)=>this.setValue(e)}/>
                    </div>
                    {/* <div className="field">
                        <div className="ui checkbox">
                        <input type="checkbox" tabIndex="0" className="hidden"/>
                        <label>I agree to the Terms and Conditions</label>
                        </div>
                    </div> */}
                    <button className="ui button" type="submit">Submit</button>
                    <button className="ui button"><Link to={{pathname:'/signup'}}>New User! Signup here</Link></button>
                    </form>
            </div>
        )
    }
}

export default LogIn