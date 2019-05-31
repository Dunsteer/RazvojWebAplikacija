import { FETCH_USERS,FETCH_USER, NEW_USER,CHANGE_STATE } from './types';
import { Action } from 'redux';
import { User } from '../../models/User';

export interface GetUsers extends Action {
}

export function getUsers(): GetUsers {
    return {
        type: FETCH_USERS
    };
}

export interface GetUser extends Action {
    id: number
}

export function getUser(id: number): GetUser {
    return {
        type: FETCH_USER,
        id: id
    };
}
export interface AddUsers extends Action {
}

export function addUsers(): AddUsers {
    return {
        type: NEW_USER
    };
}

export interface ChangeState extends Action {
    users: User[]
}

export function changeState(users: User[]): ChangeState {
    return {
        type: CHANGE_STATE,
        users
    }
}

// export const fetchUsers = () => (dispatch: any) => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//         .then(res => res.json())
//         .then(users =>
//             dispatch({
//                 type: FETCH_USERS,
//                 payload: users
//             })
//         );
// };

// export const createUser = (userData: any) => (dispatch: any) => {
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//     })
//         .then(res => res.json())
//         .then(user =>
//             dispatch({
//                 type: NEW_USER,
//                 payload: user
//             })
//         );
// };