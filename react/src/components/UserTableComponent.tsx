import React, { Component, Dispatch } from 'react';
import { getUsers, getUser } from '../store/actions/userActions';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { AppState } from '../store/store';

class UserTableComponent extends Component<any,any> {
    componentWillMount = () => {
        this.props.fetchUsers();
    }

    renderUsers(){
        if(this.props.users){
            console.log(this.props.users);
            return (
            <div>
                radi
                </div>
                );
            // return this.props.users.map((x:any,i:any)=>(
            //     <div key={i}>
            //         {x.username}
            //     </div>
            // ))
        }
    }

    render() {
        return (
            <div>
                {this.renderUsers()}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        handleSelectUser: (userId: number) => dispatch(getUser(userId)),
        fetchUsers: () => dispatch(getUsers())
    }
}
function mapStateToProps(state: AppState) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTableComponent);
