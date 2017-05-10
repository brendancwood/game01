import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(middlewares) {
    const store = createStore(
        rootReducer,
        applyMiddleware(...middlewares),
        DevTools.instrument()
    );

    return store;
}
