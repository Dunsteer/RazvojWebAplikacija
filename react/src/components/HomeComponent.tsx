import React, { Component } from 'react'
import NavbarComponent from './NavbarComponent';
import { Container } from 'react-bootstrap';
import UserComponent from './UserComponent';
import ShiftComponent from './ShiftComponent';

class HomeComponent extends Component {
    render() {
        return (
            <div>
                <NavbarComponent></NavbarComponent>
                <Container>
                    <ShiftComponent></ShiftComponent>
                </Container>

            </div>
        )
    }
}

export default HomeComponent;
