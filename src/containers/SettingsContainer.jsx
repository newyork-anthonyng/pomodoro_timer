import React from 'react';
import { connect } from 'react-redux';
import { Settings } from '../components/Settings';
import { toggleSettingsPanel, updateSettings } from '../actions';
import Utility from '../util/utility';

const mapStateToProps = (state) => {
	return {
		settingsPanelOpen: state.settingsPanelOpen,
		workDefault: Utility.convertSecondsToMinutes(state.default.work),
		breakDefault: Utility.convertSecondsToMinutes(state.default.break)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleWorkChange: (e) => {
			dispatch(updateSettings({
				work: Utility.convertMinutesToSeconds(e.target.value)
			}));
		},
		handleBreakChange: (e) => {
			dispatch(updateSettings({
				break: Utility.convertMinutesToSeconds(e.target.value)
			}));
		}
	};
};

export const SettingsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
