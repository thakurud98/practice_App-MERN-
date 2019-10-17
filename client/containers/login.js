import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Nav, Navbar, NavDropdown, Container, Row, Col} from "react-bootstrap";
import axios from 'axios';
import * as constants from  '../constants'
// import '../main.css'
class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                password: '',
                email: '',
                errorMessage: ''
            }
        }
    }

    setValue(e) {
        e.preventDefault()
        let key = e.target.value
        let name = e.target.name
        let Obj = {}
        Object.assign(Obj, this.state.user)
        Obj[name] = key
        this.setState({ user: Obj, errorMessage:'' })
    }

    LoginUser(e) {
        let {user} = this.state
        e.preventDefault()
        console.log("state in submit========", this.state)
        if(user.email !== '' && user.password !== '') {
            axios.post( constants.LOGIN, {"data": {
                "email": user.email, "password": user.password
            }})
            .then((res)=>{
                if(res.status === 200){
                    if (res.data.error){
                        console.log("res==============", res.data)
                        return this.setState({errorMessage: res.data.msg })
                    }
                    console.log("res==============", res.data)
                    localStorage.setItem('token', res.data.data.token)
                    this.props.history.push({pathname : '/profie'})
                }
            }).catch((e)=>{
                console.log("e==============", e.toString())
        
            })
        } else {
            this.setState({ errorMessage: 'Invalid values' })
        }
    }

    render() {
        console.log("state login===========", this.state)
        console.log("props login===========", this.props)
        let { user } = this.state
        return (
            <Container fluid>
                    <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        <Form inline>
                        <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                    </Navbar>
                        
                        <Container>
                        <Form onSubmit={(e) => this.LoginUser(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" value={user.email}
                                    onChange={e => this.setValue(e)}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" value={user.password}
                                    onChange={e => this.setValue(e)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Container>
                            <Row>
                                <Col>
                                {this.state.errorMessage}
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Col>
                                <Col>
                                    <Link to={{ pathname: '/signup' }}><Button variant="info">New User! Signup here </Button></Link>
                                </Col>
                            </Row>
                        </Container>
                        </Form>
                </Container>
            </Container>
        )
    }
}

export default LogIn