import React, {Component} from 'react'
import { Button, Form, Nav, Navbar, NavDropdown, Container, Row, Col} from "react-bootstrap";
import TwitterLogin from 'react-twitter-auth'
import FacebookLogin from 'react-facebook-login'
import {GoogleLogin} from 'react-google-login'
import * as constants from '../../constants'

export default class SocialLogin extends Component {
    constructor(props){
        super(props)
        this.state={
            isAuthenticated: false,
            user: null,
            token: ''
        }
        this.initialState = this.state
    }

    /**
     * Function to logout and reset the states
     */
    logout =() =>{
        this.setState(this.initialState)
    }

    /**Method to handle response */
    twitterResponse = (response) => {
        console.log("twitterResponse==============",response)
    }

    /**Method to handle response */
    facebookResponse = (response) => {
        console.log("facebookResponse==============",response)
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type: 'application/json'})
        console.log("tokenBlob facebookResponse==============",tokenBlob)
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        }
        console.log("options facebookResponse==============",options)
        fetch(`${window.location.origin}/api/v1/auth/facebook`, options)
        .then(resp => {
            console.log("fetch resp facebookResponse==============",resp)
            const token = resp.headers.get('x-auth-token');
            console.log("token resp facebookResponse==============",token)
            resp.json().then(user => {
                console.log("user resp facebookResponse==============",user)
                if(token) {
                    this.setState({isAuthenticated: true, user, token})
                }
            })
        })
    }

    /**Method to handle response */
    googleResponse = (response) => {
        console.log("googleResponse==============",response)
    }

    render(){
        console.log("states in SocialLogin==================", this.state)
        let content = !!this.state.isAuthenticated ? (
            <div>
                <p>Authenticated</p>
                <div>
                    {this.state.user.email}
                </div>
                <div>
                    <button onClick={this.logout} className="button">Logout</button>
                </div>
            </div>
        ) : (
            <div>
                <TwitterLogin 
                loginUrl={`${window.location.origin}/api/v1/auth/twitter`}
                onFailure={this.twitterResponse}
                onSuccess={this.twitterResponse}
                requestTokenUrl={`${window.location.origin}/api/v1/auth/twitter/reverse`}
                />
                <FacebookLogin 
                    appId={constants.FACEBOOK_APP_ID}
                    autoLoad={false}
                    fields="name, email, picture"
                    callback={this.facebookResponse}
                />
                <GoogleLogin 
                    clientId={constants.GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={this.googleResponse}
                    onFailure={this.googleResponse}
                />
            </div>
            )
        return(
            <Container fluid>
                Social Login
                {content}
            </Container>
        )
    }
}