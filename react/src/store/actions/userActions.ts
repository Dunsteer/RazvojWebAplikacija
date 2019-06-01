import { FETCH_USERS,FETCH_USER, NEW_USER,CHANGE_STATE, NEW_USER_SUCCESS, FETCH_USER_USERNAME, CURRENT_USER, PATCH_USER, PATCH_USER_SUCCESS } from './types';
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

export interface AddUser extends Action {
    user:User
}

export function addUserToStore(user:User): AddUser {
    return {
        type: NEW_USER,
        user: user
    };
}

export function addUserToStoreSuccess(user:User): AddUser {
    return {
        type: NEW_USER_SUCCESS,
        user: user
    };
}

export interface ChangeState extends Action {
    users: User[]
}

export function changeState(users: User[]): ChangeState {
    return {
        type: CHANGE_STATE,
        users:users
    }
}

export interface CurrentUser extends Action {
}

export function getCurrentUser(): CurrentUser {
    return {
        type: CURRENT_USER
    };
}

export interface PatchUser extends Action{
    user:User
}

export function updateUser(user:User): PatchUser {
    return {
        type: PATCH_USER,
        user:user
    };
}

export function updateUserSuccess(user:User): PatchUser {
    return {
        type: PATCH_USER_SUCCESS,
        user: user
    };
}