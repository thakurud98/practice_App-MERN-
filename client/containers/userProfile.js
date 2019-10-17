import React, { Component } from 'react'
import { Card, Button, Container, Row } from 'react-bootstrap'
import axios from 'axios';
import * as constants from  '../constants'

class UserProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            errorMessage: "",
            successMessage: ""
        }
    }

    logoutUser(){
        try{
            axios.post( constants.LOGOUT,{}, {
                headers:{
                    "Authorization" : "Bearer "+ localStorage.token
                }
            })
            .then((res)=>{
                if(res.status === 200){
                    console.log("res==============", res.data)
                    if (res.data.error){
                        return this.setState({errorMessage: res.data.msg })
                    }
                    localStorage.removeItem('token')
                    this.setState({successMessage: res.data.msg })
                    setTimeout(()=>this.props.history.push({pathname : '/login'}), 2000)
                }
            }).catch((e)=>{
                console.log("e==============", e.toString())
        
            })
        }catch(e){

        }
        
    }
    render() {
        let {successMessage, errorMessage} = this.state
        return (
            <Container style={{ width: "100%" }}>
                    <Card className="text-center">
                        <Card.Header>User Profile</Card.Header>
                        <Card.Body>
                            <Card.Title>User Name</Card.Title>
                            <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                            <Button variant="primary" onClick={()=>this.logoutUser()}>Logout</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">last login</Card.Footer>
                    </Card>

                    {successMessage, errorMessage}
            </Container>
        )
    }
}

export default UserProfile
