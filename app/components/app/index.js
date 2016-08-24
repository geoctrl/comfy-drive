import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fileActions from '../../actions/file-actions';

import Nav from './components/nav';
import Path from './components/path';

export default class App extends React.Component {


	// TODO: we need to authorize access before rendering


	render() {
		console.log(this.props);
		return (
				<div className="app">
					<Nav />
					<Path />
				</div>
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
