import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fileActions from './actions/file-actions';

export default class App extends React.Component {
	render() {
		console.log(this.props);
		return (
				<div>This is the app</div>
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
