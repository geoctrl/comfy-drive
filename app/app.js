import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fileActions from './actions/file-actions';
import { Router, Route, browserHistory} from 'react-router';
import Login from './pages/login';

export default class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		console.log(this);
		return (
				<Router history={browserHistory}>
					<Route path="/login" component={Login} />
				</Router>
		)
	}
}




function mapStateToProps(state) {
	return { files: state.filesReducer };
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(fileActions, dispatch) };
}

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(App);