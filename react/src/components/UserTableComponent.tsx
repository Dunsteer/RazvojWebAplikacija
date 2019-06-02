import React, { Component, Dispatch } from 'react';
import { getUsers } from '../store/actions/userActions';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { AppState } from '../store/store';
import { Table } from 'react-bootstrap';
import ActivityComponent from './ActivityComponent';
import { User } from '../models/User';
import GraphComponent from './GraphComponent';

interface Props{
    fetchUsers:()=>void;
    users:User[]
}

interface State{
    selectedId:number
}

class UserTableComponent extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            selectedId: null
        }

        this.userSelected = this.userSelected.bind(this);
    }
    componentWillMount = () => {
        this.props.fetchUsers();
    }

    userSelected(id) {
        if (id == this.state.selectedId) {
            this.setState({
                selectedId: null
            })
        }
        else {
            this.setState({
                selectedId: id
            })
        }
    }

    renderUsers() {
        if (this.props.users.length > 0) {
            return (
                <tbody>
                    {
                        this.props.users.map((x: User, i: number) => {
                            let test = [(
                                <tr key={i} onClick={() => { this.userSelected(i) }}>
                                    <td>{x.id}</td>
                                    <td>{x.username}</td>
                                    <td>{x.password}</td>
                                    <td><ActivityComponent logs={x.logs}></ActivityComponent></td>
                                </tr>)
                            ]
                            test.push((
                                <tr hidden={this.state.selectedId !== i}>
                                    <td colSpan={4}>
                                        <GraphComponent logs={x.logs}></GraphComponent>
                                    </td>
                                </tr>
                            ))
                            return test;
                        })
                    }
                </tbody>
            )
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
                {this.renderUsers()}

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
        users: state.users.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTableComponent);
