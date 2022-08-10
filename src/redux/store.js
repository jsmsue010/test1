import { createStore, applyMiddleware } from 'redux';
import allReducer from './reducers';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './saga';

const sageMiddleware = createSagaMiddleware();
const store = createStore(allReducer, applyMiddleware(sageMiddleware));
sageMiddleware.run(rootSaga);

export default store;
