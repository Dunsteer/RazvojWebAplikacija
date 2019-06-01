import { User } from "../models/User";

const url = 'http://localhost:3300/users';

export function getAllUsers() {
    return fetch(url)
        .then(response => response.json());
}

export function addUser(user: User) {
    user.logs=[];
    return fetch(url, { method: "POST", body: JSON.stringify(user), headers: { "Content-Type": "application/json" } })
        .then(response => response.json());
}

export function updateUser(user:User){
    return fetch(`${url}/${user.id}`, { method: "PATCH", body: JSON.stringify(user), headers: { "Content-Type": "application/json" } })
        .then(response => response.json());
}