import React, { Component } from 'react'
import NavbarComponent from './NavbarComponent';
import { Container } from 'react-bootstrap';
import UserComponent from './UserComponent';

class HomeComponent extends Component {
    render() {
        return (
            <div>
                <NavbarComponent></NavbarComponent>
                <Container>
                    <div>
                        Home
                    </div>
                    <UserComponent></UserComponent>
                </Container>
            </div>
        )
    }
}

export default HomeComponent;
