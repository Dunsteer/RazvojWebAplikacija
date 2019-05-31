import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import { all, takeEvery } from '@redux-saga/core/effects';
import { FETCH_USERS } from './actions/types';
import { fetchUsers } from './saga';

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

window.__REDUX_DEVTOOLS_EXTENSION__ = window.__REDUX_DEVTOOLS_EXTENSION__;

export interface AppState {
    users: any
}

function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);
    return store;
}

export function* rootSaga() {
    yield all([
        takeEvery(FETCH_USERS, fetchUsers)
    ]);
}

export default configureStore();