import React, { Component } from 'react'
import { FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../store/store';
import { getUsers } from '../store/actions/userActions';
import { Dispatch, Action } from 'redux';
import { User } from '../models/User';

interface Props {
    currentUser: User;
    fetchUsers: ()=>void;
    users:User[];
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

    componentWillMount = () => {
        this.props.fetchUsers();
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
        let users = this.props.users.filter(x=>x.username == this.state.username);
        if(users.length>0){
            let user = users.pop();

            if (user.password === this.state.password) {
                const cookies = new Cookies();
                cookies.set('logedIn', this.state.username, { path: '/' });
    
                this.setState({
                    redirect: true
                });
                return;
            }
        }

        this.setState({
            password:"",
            error:"Invalid username or password."
        });
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    renderErrorMessage(){
        if(this.state.error!=null){
            return (
                <small className="text-danger">
                    {this.state.error}
                </small>
            )
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
                        {this.renderErrorMessage()}
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

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        fetchUsers: () => dispatch(getUsers())
    }
}
function mapStateToProps(state: AppState) {
    return {
        users: state.users.users,
        currentUser: state.users.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
