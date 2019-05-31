import React, { Component } from 'react'
import { FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

interface Props {
}

interface State {
    username: string;
    password: string;
}

class LoginComponent extends Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = (event: any) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event: any) => {
        event.preventDefault();

        const cookies = new Cookies();
        cookies.set('logedIn', this.state.username, { path: '/' });

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
            <div className="Login">
                {this.renderRedirect()}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="username"  >
                        <Form.Label>Username</Form.Label>
                        <Form.Control

                            autoFocus
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </Form.Group>
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
              </Button>
                </Form>
            </div>
        );
    }
}

export default LoginComponent;
