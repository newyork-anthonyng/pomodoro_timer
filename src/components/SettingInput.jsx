import React from 'react';

export function SettingInput(props) {
	const { handleChange, value } = props;

	return (
		<input
			type="number"
			min="1"
			max="60"
			value={value}
			onChange={handleChange}
		/>
	);
};
