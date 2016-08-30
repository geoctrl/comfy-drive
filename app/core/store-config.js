import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../modules/reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import StateHistory from './state-history';

const storeConfig = () => {
	let middlewares = [thunkMiddleware, promiseMiddleware()];

	if (__DEV__) {
		middlewares.push(createLogger());
	}

	const finalCreateStore = compose(
			applyMiddleware.apply(null, middlewares)
	)(createStore);

	let store = finalCreateStore(reducers);

	store.subscribe(() => {
		StateHistory.push(store.getState());
	});

	return store;
};


export default storeConfig;
