import React from 'react';
import { connect } from 'react-redux';
import { Settings } from '../components/Settings';
import { toggleSettingsPanel, updateSettings } from '../actions';

const mapStateToProps = (state) => {
	return {
		settingsPanelOpen: state.settingsPanelOpen,
		workDefault: state.default.work,
		breakDefault: state.default.break
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleWorkChange: (e) => {
			dispatch(updateSettings({
				work: e.target.value
			}));
		},
		handleBreakChange: (e) => {
			dispatch(updateSettings({
				break: e.target.value
			}));
		}
	};
};

export const SettingsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
