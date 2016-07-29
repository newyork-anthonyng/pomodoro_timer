import React from 'react';
import { connect } from 'react-redux';
import { TimeContainer } from './TimeContainer';
import { TimerLabelsContainer } from './TimerLabelsContainer';
import { SettingsContainer } from './SettingsContainer';
import { Footer } from '../components/Footer';

export function App() {
	return (
		<div>
			<TimeContainer />
			<TimerLabelsContainer />
			<SettingsContainer />
			<Footer />
		</div>
	);
};
