const url = 'http://localhost:3300/users';

export function getAllUsers() {
    return fetch(url)
        .then(response => response.json());
}