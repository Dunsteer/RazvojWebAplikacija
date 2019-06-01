import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import { all, takeEvery, takeLatest, fork } from '@redux-saga/core/effects';
import { FETCH_USERS, NEW_USER, PATCH_USER } from './actions/types';
import { fetchUsers, postUserWatcher, patchUserWatcher } from './saga';
import {composeWithDevTools} from 'redux-devtools-extension';

export interface AppState {
    users: any
}

function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = applyMiddleware(sagaMiddleware);
    const store = createStore(
        rootReducer,
        composeWithDevTools(middlewares)
    );
    sagaMiddleware.run(rootSaga);
    return store;
}

export function* rootSaga() {
    yield takeEvery(FETCH_USERS, fetchUsers);
    yield takeLatest(NEW_USER, postUserWatcher);
    yield takeLatest(PATCH_USER, patchUserWatcher);
}

export default configureStore();