import React, { Component } from 'react'
import NavbarComponent from './NavbarComponent';
import { Container } from 'react-bootstrap';
import UserComponent from './UserComponent';
import ShiftComponent from './ShiftComponent';
import ActivityComponent from './ActivityComponent';
import GraphComponent from './GraphComponent';
import { connect } from 'react-redux';
import { AppState } from '../store/store';
import { Dispatch, Action } from 'redux';
import { User } from '../models/User';

interface Props {
    currentUser: User;
}

interface State {
}

class HomeComponent extends Component<Props,State> {
    render() {
        let logs = [];
        
        logs.push({
            timestamp:new Date(),
            type:0
        })

        if(this.props.currentUser){
            logs = this.props.currentUser.logs
        }
        return (
            <div>
                <NavbarComponent></NavbarComponent>
                <Container>
                    <ShiftComponent></ShiftComponent>
                    <ActivityComponent logs={logs}></ActivityComponent>
                    <GraphComponent logs={logs}></GraphComponent>
                </Container>

            </div>
        )
    }
}
function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
    }
}
function mapStateToProps(state: AppState) {
    return {
        currentUser: state.users.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);