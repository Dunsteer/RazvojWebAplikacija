import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, NavItem } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

interface Props {
}

interface State {
    redirect:boolean;
}

class NavbarComponent extends Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state = {
            redirect:false
        };
    }

    isLogedIn():boolean{
        return false;
    };

    handleLogout(){
        const cookies = new Cookies();
        cookies.remove('logedIn');
        this.setState({
            redirect: true
        })
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                {this.renderRedirect()}
                <LinkContainer to="/"><Navbar.Brand href="#home">ShiftApp</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                        {/* <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer> */}
                    </Nav>
                    <Form inline>
                        <Button variant="danger" onClick={this.handleLogout.bind(this)} type='button'>Logout</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavbarComponent;
