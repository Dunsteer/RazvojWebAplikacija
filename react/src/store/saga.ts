import { put, all, takeEvery } from "@redux-saga/core/effects";
import { getAllUsers} from "../services/userService";
import {  changeState } from "./actions/userActions";


export function* fetchUsers(){ 
    const users = yield getAllUsers();
    yield put(changeState(users));
}