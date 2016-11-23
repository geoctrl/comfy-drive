import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fileActions from '../../modules/actions/file-actions';
import ReactTooltip from 'react-tooltip';

import Header from './header';
import View from './view';

class App extends React.Component {

	// TODO: we need to authorize access before rendering

	componentDidMount() {
		this.props.actions.selectFolder(1); // todo: add admin feature to choose a default location vs last visited
	}

	render() {
		return (
				<div className="app">
					<ReactTooltip effect="solid" class={'view-toolbar__tooltip'} place="top" />
					<Header { ...this.props } />
					<View { ...this.props } />
				</div>
		)
	}
}

const mapStateToProps = state =>{
	return { files: state.filesReducer };
};

const mapDispatchToProps = dispatch => {
	return { actions: bindActionCreators(fileActions, dispatch) };
};

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(App);
