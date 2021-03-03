import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import appReducer from "./reducer";
import appSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(appReducer, composeEnhancers(...enhancers));

sagaMiddleware.run(appSaga);

export default store;
