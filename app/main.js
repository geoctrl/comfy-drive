import './sass/main.scss';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import storeConfig from './core/store-config';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory} from 'react-router';
import App from './pages/home';
import Login from './pages/login';
import Admin from './pages/admin';
import iconMaster from './components/icons/master.svg';

const Root = ({store}) => (
		<div>
			<div style={{display: 'none'}} dangerouslySetInnerHTML={{__html: iconMaster}} />

			<Provider store={store}>
				<div>
					<Router history={ browserHistory }>
						<Route path="/" component={App} />
						<Route path="/login" component={Login} />
						<Route path="/admin" component={Admin} />
					</Router>
				</div>
			</Provider>
		</div>
);

Root.propTypes = {
	store: PropTypes.object.isRequired
};


const store = storeConfig();

ReactDOM.render(
		<Root store={store} />,
		document.getElementById('app')
);