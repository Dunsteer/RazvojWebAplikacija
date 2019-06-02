import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap';
import { getUsers, addUserToStore } from '../store/actions/userActions';
import { Dispatch, Action } from 'redux';
import { AppState } from '../store/store';
import { connect } from 'react-redux';
import { User } from '../models/User';

interface Props {
    addUser:(user:User)=>void;
}

interface State {
    username: string;
    password: string;
}

class AddUserComponent extends Component<Props, any> {

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
        let user :User = {
            username:this.state.username,
            password :this.state.password,
            admin:false
        } 
        //addUser(user);

        this.props.addUser(user);
    }

    render() {
        return (
            <div>
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
                        Add
                    </Button>
                </Form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        addUser: (user:User) => dispatch(addUserToStore(user)),
        fetchUsers: () => dispatch(getUsers())
    }
}
function mapStateToProps(state: AppState) {
    return {
        users: state.users.users,
        currentUser:state.users.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserComponent);
