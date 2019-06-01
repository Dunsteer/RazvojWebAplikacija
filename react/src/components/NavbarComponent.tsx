import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { Dispatch, Action } from 'redux';
import {  getUsers, getCurrentUser } from '../store/actions/userActions';
import { AppState } from '../store/store';
import { connect } from 'react-redux';

interface Props {
}

interface State {
    redirect: boolean;
}

class NavbarComponent extends Component<any, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    componentDidMount = () => {
        this.props.fetchUsers();
    }

    isAdmin(): boolean {
        this.props.getCurrentUser();
        if(this.props.currentUser)
        return this.props.currentUser.admin;
    };

    handleLogout() {
        const cookies = new Cookies();
        cookies.remove('logedIn');
        this.setState({
            redirect: true
        })
    }

    renderUsers() {
        if (this.isAdmin()) {
            return (<LinkContainer to="/users"><Nav.Link>Users</Nav.Link></LinkContainer>)
        }
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
                        <LinkContainer to="/">
                            <Nav.Link>
                                Home
                                </Nav.Link>
                            </LinkContainer>
                        {this.renderUsers()}
                    </Nav>
                    <Form inline>
                        <Button variant="danger" onClick={this.handleLogout.bind(this)} type='button'>Logout</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        fetchUsers: () => dispatch(getUsers()),
        getCurrentUser:() =>dispatch(getCurrentUser())
    }
}
function mapStateToProps(state: AppState) {
    return {
        users: state.users.users,
        currentUser: state.users.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
