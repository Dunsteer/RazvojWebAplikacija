import React, { Component } from 'react'
import AddUserComponent from './AddUserComponent';
import UserTableComponent from './UserTableComponent';

export default class UserComponent extends Component {
    render() {
        return (
            <div>
                <AddUserComponent></AddUserComponent>
                <UserTableComponent></UserTableComponent>
            </div>
        )
    }
}
