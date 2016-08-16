import React from 'react';
import ReactDOM from 'react-dom';
import Root from './core/root';
import storeConfig from './core/store-config';

const store = storeConfig();

ReactDOM.render(
		<Root store={store} />,
		document.getElementById('app')
);