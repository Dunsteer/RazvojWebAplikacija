import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { Dispatch, Action } from 'redux';
import { getUsers, getCurrentUser, updateUser } from '../store/actions/userActions';
import { AppState } from '../store/store';
import { connect } from 'react-redux';
import { User } from '../models/User';
import { LogType } from '../models/Log';

interface Props{
    fetchUsers:()=>void;
    getCurrentUser:()=>void;

    updateUser:(user:User)=>void;
    currentUser:User;
}

interface State{
    state:number
}

class ShiftComponent extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            state: 0
        }
    }

    componentWillMount = () => {
        this.props.fetchUsers();
        this.props.getCurrentUser();
    }

    componentDidMount = () => {
        console.log(this.props);
    }

    componentWillReceiveProps(){
        this.currentState();
    }

    currentState() {
        if (this.props.currentUser != null) {
            const logs = this.filterForToday();
            if (logs.length > 0) {
                const lastLog = logs[logs.length - 1];

                if (lastLog.type == LogType.Start) {
                    this.setState({
                        state: 1
                    });
                } else if (lastLog.type == LogType.Pause) {
                    this.setState({
                        state: 2
                    });
                } else if (lastLog.type == LogType.Return) {
                    this.setState({
                        state: 1
                    });
                }
                else if (lastLog.type == LogType.End) {
                    this.setState({
                        state: 3
                    });
                }
            }
        }
    }

    filterForToday() {
        if (this.props.currentUser.logs.length > 0) {
            return this.props.currentUser.logs.filter((log) => {
                let res = true;
                res = res && new Date(log.timestamp).getDay() === new Date().getDay();
                res = res && new Date(log.timestamp).getMonth() === new Date().getMonth();
                return res;
            })
        }
        return [];
    }

    start(ev) {
        this.props.getCurrentUser();
        if (this.props.currentUser != null) {
            let log = {
                timestamp: new Date(),
                type: 0
            }

            this.props.currentUser.logs.push(log);

            this.props.updateUser(this.props.currentUser);

            this.setState({
                state: 1
            });
        }
    }

    pause(ev) {
        if (this.props.currentUser != null) {
            let log = {
                timestamp: new Date(),
                type: 1
            }

            this.props.currentUser.logs.push(log);

            this.props.updateUser(this.props.currentUser);

            this.setState({
                state: 2
            });
        }
    }

    resume(ev) {
        if (this.props.currentUser != null) {
            let log = {
                timestamp: new Date(),
                type: 2
            }

            this.props.currentUser.logs.push(log);

            this.props.updateUser(this.props.currentUser);

            this.setState({
                state: 1
            });
        }
    }

    end(ev) {
        if (this.props.currentUser != null) {
            let log = {
                timestamp: new Date(),
                type: 3
            }

            this.props.currentUser.logs.push(log);

            this.props.updateUser(this.props.currentUser);

            this.setState({
                state: 3
            });
        }
    }

    disableStart() {
        return !(this.state.state == 0);
    }

    disablePause() {
        return !(this.state.state == 1);
    }
    disableRestart() {
        return !(this.state.state == 2);
    }

    disableEnd() {
        return !(this.state.state == 1);
    }

    render() {
        return (
            <div className="d-flex justify-content-center my-5">
                <Button className="mx-3" variant="success" disabled={this.disableStart()} onClick={this.start.bind(this)}>
                    Start
                </Button>
                <Button className="mx-3" variant="warning" disabled={this.disablePause()} onClick={this.pause.bind(this)}>
                    Pause
                </Button>
                <Button className="mx-3" variant="warning" disabled={this.disableRestart()} onClick={this.resume.bind(this)}>
                    Resume
                </Button>
                <Button className="mx-3" variant="danger" disabled={this.disableEnd()} onClick={this.end.bind(this)}>
                    End
                </Button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        fetchUsers: () => dispatch(getUsers()),
        getCurrentUser: () => dispatch(getCurrentUser()),
        updateUser: (user: User) => dispatch(updateUser(user))
    }
}

function mapStateToProps(state: AppState) {
    return {
        currentUser: state.users.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftComponent);
