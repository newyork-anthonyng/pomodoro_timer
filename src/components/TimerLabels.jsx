import React from 'react';
import { Label } from './Label';

export function TimerLabels(props) {
	const { handlePlayClick, handleResetClick, handleSettingsClick, isRunning } = props;

	return (
		<div id="actions">
			<Label
				handleClick={handlePlayClick}
			>
				{ isRunning ? 'Pause' : 'Play' }
			</Label>
			<Label
				handleClick={handleResetClick}
			>
				Reset
			</Label>
			<Label
				handleClick={handleSettingsClick}
			>
				Settings
			</Label>
		</div>
	);
};
