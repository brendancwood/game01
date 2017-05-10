import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(middlewares) {
    return createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    );
}
