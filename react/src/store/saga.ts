import { put, all, takeEvery } from "@redux-saga/core/effects";
import { getAllUsers, addUser, updateUser} from "../services/userService";
import {  changeState, addUserToStore, AddUser, addUserToStoreSuccess, updateUserSuccess, getCurrentUser } from "./actions/userActions";
import { User } from "../models/User";


export function* fetchUsers(){ 
    const users = yield getAllUsers();
    yield put(changeState(users));
    yield put(getCurrentUser());
}

export function* postUserWatcher(user:AddUser){ 
    const dbUser= yield addUser(user.user);    
    yield put(addUserToStoreSuccess(dbUser));
}

export function* patchUserWatcher(user:AddUser){
    const dbUser= yield updateUser(user.user);    
    yield put(updateUserSuccess(dbUser));
}