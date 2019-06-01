import React, { Component } from 'react'
import AddUserComponent from './AddUserComponent';
import UserTableComponent from './UserTableComponent';
import { Container } from 'react-bootstrap';
import NavbarComponent from './NavbarComponent';

export default class UserComponent extends Component {
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
