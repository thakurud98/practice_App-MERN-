import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, Nav, Navbar, NavDropdown, Container, Row, Col} from "react-bootstrap";

class SignUp extends Component {
    constructor(props){
        super(props)
        this.state={
            user:{
                name:'',
                password: '',
                email: '',
                age: 0
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

    createUser(e){
        e.preventDefault()
        console.log("state in submit========", this.state)
    }

    render(){
        console.log("state user===========", this.state)
        let {user} = this.state
        return(
            // <div className="ui container">
            //     <form className="ui form" onSubmit={(e)=>this.createUser(e)}>
            //         <div className="field">
            //             <label>Full Name</label>
            //             <input type="text" value={user.name} name="name" placeholder="First Name" onChange={(e)=>this.setValue(e)}/>
            //         </div>
            //         <div className="field">
            //             <label>Age</label>
            //             <input type="number"  value={user.age}  name="age" placeholder="999999999" onChange={(e)=>this.setValue(e)}/>
            //         </div>
            //         <div className="field">
            //             <label>Email</label>
            //             <input type="email"  value={user.email} name="email" placeholder="abc@xyz.com" onChange={(e)=>this.setValue(e)}/>
            //         </div>
            //         <div className="field">
            //             <label>Password</label>
            //             <input type="password" value={user.password} name="password" placeholder="********" onChange={(e)=>this.setValue(e)}/>
            //         </div>
            //         <div className="field">
            //             <div className="ui checkbox">
            //             <input type="checkbox" tabIndex="0" className="hidden"/>
            //             <label>I agree to the Terms and Conditions</label>
            //             </div>
            //         </div>
            //         <button className="ui button" type="submit">Submit</button>
            //         <button className="ui button"><Link to={{pathname:'/login'}}>Already User! Login here</Link></button>

            //         </form>
            // </div>
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
                    <Form onSubmit={(e) => this.createUser(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control required type="text" name="name" placeholder="ABC XYZ" value={user.name}
                                onChange={e => this.setValue(e)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" value={user.email}
                                    onChange={e => this.setValue(e)}/>
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
                                <Link to={{ pathname: '/login' }}><Button variant="info">Already User! Login here </Button></Link>
                            </Col>
                        </Row>
                    </Container>
                    </Form>
            </Container>
        </Container>
        )
    }
}

export default SignUp