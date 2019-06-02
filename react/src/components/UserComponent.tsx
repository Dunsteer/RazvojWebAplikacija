import React, { Component } from 'react'
import AddUserComponent from './AddUserComponent';
import UserTableComponent from './UserTableComponent';
import { Container } from 'react-bootstrap';
import NavbarComponent from './NavbarComponent';

interface Props{

}

interface State{

}

export default class UserComponent extends Component<Props,State> {
    render() {
        return (
        <div>
            <NavbarComponent></NavbarComponent>
            <Container>
                <AddUserComponent></AddUserComponent>
                <UserTableComponent></UserTableComponent>
            </Container>
        </div>

        )
    }
}
