import React, { Component, Dispatch } from 'react';
import { getUsers } from '../store/actions/userActions';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { AppState } from '../store/store';
import { Table } from 'react-bootstrap';
import ActivityComponent from './ActivityComponent';
import { User } from '../models/User';

class UserTableComponent extends Component<any, any> {
    componentWillMount = () => {
        this.props.fetchUsers();
    }

    renderUsers() {
        if (this.props.users.length > 0) {
            return this.props.users.map((x: User, i: number) => {
                return (
                    <tr key={i}>
                        <td>{x.id}</td>
                        <td>{x.username}</td>
                        <td>{x.password}</td>
                        <td><ActivityComponent logs={x.logs}></ActivityComponent></td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
            <Table striped bordered className="mt-3" >
                <thead>
                    <tr>
                        <th>
                            Id
                        </th>
                        <th>
                            Username
                        </th>
                        <th>
                            Password
                        </th>
                        <th>
                            Activity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderUsers()}
                </tbody>
            </Table>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserTableComponent);
