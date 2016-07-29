import React from 'react';
import { SettingInput } from './SettingInput';

export function Settings(props) {
	const { handleWorkChange, handleBreakChange, settingsPanelOpen } = props;
	const { workDefault, breakDefault } = props;

	if(settingsPanelOpen) {
		return (
			<div id="settings">
				<p>Work</p>
				<SettingInput
					value={workDefault}
					handleChange={handleWorkChange}
				/>
				<br />
				<p>Break</p>
				<SettingInput
					value={breakDefault}
					handleChange={handleBreakChange}
				/>
			</div>
		);
	} else {
		return null;
	}
};
